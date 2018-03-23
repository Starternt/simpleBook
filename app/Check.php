<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Check extends Model
{
    public function checkData($data){
        $errors = false;
        if(strlen($data['name']) >= 150 || !($data['name'])){
            $errors['name'] = 'Ошибка! Имя не должно быть пустым или содержать более 150 знаков';
        }
        if(strlen($data['author']) >= 100 || !($data['name'])){
            $errors['author'] = 'Ошибка! Поле автора не должно быть пустым или содержать более 100 знаков';
        }
        if(!is_numeric($data['publish_year'])){
            $errors['publish_year'] = 'Ошибка! Нужно указать число';
        }
        if(strlen($data['description']) >= 2000 || !($data['name'])){
            $errors['description'] = 'Ошибка! Описание не должно быть пустым или содержать более 2000 знаков';
        }

        return $errors;
    }
}
