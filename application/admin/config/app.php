<?php
//配置文件
return [
	'name' => request()->module(),
	'CDN' => '/',
	'version' => '1.0',
	'menu'=>[
			'menu'=>[
					[
						'name'=>'菜单管理',
						'url'=>'admin/menu/index',
						'icon'=>'fa fa-list-ul'
					],
					[
						'name'=>'添加',
						'url'=>'admin/menu/add',
						'icon'=>'fa fa-plus'
					],
			],
	],
];