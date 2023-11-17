<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, alpha, numeric } from '@vuelidate/validators';

export default {
    setup() {
        const state = reactive({
            firstName: '',
            lastName: '',
            patronymic: '',
            dateBirth: '',
        })
        const rules = {
            firstName: { 
                         required: helpers.withMessage('Это поле обязательное для заполнения', required), 
                         alpha: helpers.withMessage('Введите имя', alpha),
            },
            lastName: { 
                required:  helpers.withMessage('Это поле обязательное для заполнения', required),
                alpha: helpers.withMessage('Введите фамилию', alpha),        
            },
            patronymic: {
                alpha: helpers.withMessage('Введите отчество', alpha),      
            },
            dateBirth: {
                numeric: helpers.withMessage('Введите дату рождения', numeric),
            }
        }

        const v$ = useVuelidate(rules, state)
        return { state, v$ }
    },
    methods: {
      async submitForm() {
        const result = await this.v$.$validate()
        if (!result) {
            console.log('error');
            return
        }
        console.log('submit', this.state.firstName)
       }
    }
}
</script>

<template>
 <form @submit.prevent="submitForm">
    <div class="wrapper">
    <label>
        Фамилия
        <input type="text" v-model="state.lastName">
        <div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
           <div class="error-msg">{{ error.$message }}</div>
        </div>
    </label>
    <label>
        Имя
        <input type="text" v-model="state.firstName">
          <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
          </div>
    </label>
    <label>
        Отчество
        <input type="text" v-model="state.patronymic">
          <div class="input-errors" v-for="error of v$.patronymic.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
          </div>
        <label>
          Дата рождения
          <input type="date" v-model="state.dateBirth">
            <div class="input-errors" v-for="error of v$.dateBirth.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
    </label>
    </label>
    </div>
    <label type="tel">Номер телефона</label>
    <input>
    <label>Пол</label>
    <input>
    <label>Группа клиентов</label>
    <select multiple>
        <option>VIP</option>
        <option>Проблемные</option>
        <option>ОМС</option>
    </select>
    <label>Лечащий врач</label>
    <select>
        <option>Иванов</option>
        <option>Захаров</option>
        <option>Черышева</option>
    </select>
    <label>Не отправлять СМС</label>
    <input type="checkbox">
    <p>Адрес</p>
    <label>Индекс</label>
    <input>
    <label>Страна</label>
    <input type="text">
    <label>Область</label>
    <input type="text">
    <label>Город</label>
    <input type="text">
    <label>Улица</label>
    <input type="text">
    <label>Дом</label>
    <input>
    <p>Паспорт</p>
    <label>Тип документа</label>
    <select>
        <option>Паспорт</option>
        <option>Свидетельство о рождении</option>
        <option>Вод.удостоверение</option>
    </select>
    <label>Серия</label>
    <input>
    <label>Номер</label>
    <input>
    <label>Кем выдан</label>
    <input type="text">
    <label>Дата выдачи</label>
    <input type="date">
    <input type="submit" value="Отправить">
 </form>
</template>

<style>
.wrapper {
    display: flex;
    flex-direction: column;
}
.error-msg {
    color: red;
}
</style>