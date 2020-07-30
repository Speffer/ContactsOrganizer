<template>
  <div>
    <a-form-model :model="form" ref="companyForm" :rules="rules">
      <a-form-model-item prop="name" label="Nome">
        <a-input v-model="form.name" />
      </a-form-model-item>

      <a-form-model-item prop="city" label="Município">
        <a-input v-model="form.city" />
      </a-form-model-item>

      <a-form-model-item label="Tipo de pessoa">
        <a-radio-group v-model="form.type">
          <a-radio checked :value="documentType.CPF">
            Física (CPF)
          </a-radio>
          <a-radio :value="documentType.CNPJ">
            Jurídica (CNPJ)
          </a-radio>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item prop="document" label="Número do Documento">
        <a-input v-model="form.document" />
      </a-form-model-item>

      <a-form-model-item prop="birthday" v-if="form.type === documentType.CPF" label="Data de Nascimento">
        <a-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="Clique no botão para abrir o calendário"
          style="width: 100%;"
          format="DD/MM/YYYY"
          :locale="locale"
        />
      </a-form-model-item>

      <a-form-model-item prop="RG" v-if="form.type === documentType.CPF" label="RG">
        <a-input v-model="form.RG" />
      </a-form-model-item>

      <a-form-model-item prop="fantasyName" v-if="form.type === documentType.CNPJ" label="Nome Fantasia">
        <a-input v-model="form.fantasyName" />
      </a-form-model-item>
      
    </a-form-model>
  </div>
</template>

<script>
import documentType from '../helpers/constants/documentType';
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR';

export default {
  name: 'CompanyForm',
  props: [
    'form'
  ],
  data() {
    return {
      documentType,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      locale,
      rules: {
        name: [{
          required: true, message: 'Por favor preencha o nome', trigger: 'blur'
        }],
        city: [{
          required: true, message: 'Por favor preencha a cidade', trigger: 'blur'
        }],
        birthday: [{
          required: this.form.type === documentType.CPF, message: 'Por favor preencha a data de nascimento', trigger: 'blur'
        }],
        RG: [{
          required: this.form.type === documentType.CPF, message: 'Por favor preencha o RG', trigger: 'blur'
        }, {
          message: 'O RG precisa ser composto por números apenas', trigger: 'blur', pattern: /^[0-9]+$/
        }],
        fantasyName: [{
          required: this.form.type === documentType.CNPJ, message: 'Por favor preencha o RG', trigger: 'blur'
        }],
        document: [{
          required: true, message: 'Por favor preencha o número do documento', trigger: 'blur'
        }, {
          message: 'O documento precisa ser composto por números apenas', trigger: 'blur', pattern: /^[0-9]+$/
        }]
      }
    };
  },
  methods: {
    validate: () => {
      this.$refs.companyForm.validate((isValid) => {
        this.$emit('refForm', isValid);
      });
    }
  }
};
</script>

<style scoped>

</style>
