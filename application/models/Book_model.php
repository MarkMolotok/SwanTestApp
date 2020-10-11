<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		// todo реализовать получение списка книг из БД
		/*return array(
			array('book_id' => 1, 'book_name' => 'Евгений Онегин', 'author_name' => 'Пушкин А.С.', 'book_year' => 1833),
			array('book_id' => 2, 'book_name' => 'Война и мир', 'author_name' => 'Толстой Л.Н.', 'book_year' => 1869),
			array('book_id' => 3, 'book_name' => 'Анна Каренина', 'author_name' => 'Толстой Л.Н.', 'book_year' => 1877)
		);*/

		$res = $this->db->query("
			select
				book_id,
				book_name,
				author_name,
				book_year
			from book
		");

		return $res->result('array');
	}

	public function save($data)
	{
		if (empty($data['book_id'])) {
			$query = "
				insert into book(book_name, author_name, book_year)
				values ('{$data['book_name']}', '{$data['author_name']}', {$data['book_year']})
			";
		} else {
			$query = "
				update book
				set
					book_name = '{$data['book_name']}',
					author_name = '{$data['author_name']}',
					book_year = {$data['book_year']}
				where
					book_id = {$data['book_id']}
			";
		}

		$this->db->query($query);

		return ['success' => true];
	}
}
