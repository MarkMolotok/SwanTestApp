<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book
 * Контроллер для работы с книгами
 */
class Book extends CI_Controller {
	public $inputRules = [
		'loadList' => [],
		'save' => [[
			'type' => 'int',
			'field' => 'book_id',
			'label' => 'Идентификатор книги',
			'rules' => ''
		], [
			'type' => 'string',
			'field' => 'author_name',
			'label' => 'Автор книги',
			'rules' => 'required|max_length[50]'
		], [
			'type' => 'string',
			'field' => 'book_name',
			'label' => 'Название книги',
			'rules' => 'required|max_length[100]'
		], [
			'type' => 'int',
			'field' => 'book_year',
			'label' => 'Год издания',
			'rules' => 'required|max_length[4]'
		]],
	];

	/**
	 * Загрузка списка книг
	 */
	public function loadList()
	{
		$this->load->model('Book_model');
		$bookList = $this->Book_model->loadList();
		echo json_encode($bookList);
	}

	public function save()
	{
		$this->load->library('form_validation');
		$this->form_validation->set_rules($this->inputRules['save']);

		if (!$this->form_validation->run()) {
			$errors = array_values($this->form_validation->error_array());
			echo json_encode(['success' => false, 'msg' => $errors[0]]);
			return;
		}

		/*echo '<pre>';
		print_r([
			$this->input->post('book_name')
		]);*/

		$data = [];
		foreach($this->inputRules['save'] as $item) {
			$fieldName = $item['field'];
			$data[$fieldName] = $this->input->post($fieldName);
		}

		$this->load->model('Book_model');
		$result = $this->Book_model->save($data);
		echo json_encode($result);
	}
}
