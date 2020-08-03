<template>
  <div>
    <a-form-model :model="form" ref="companyForm" :rules="rules">
      <a-form-model-item prop="name" label="Nome">
        <a-input v-model="form.name" />
      </a-form-model-item>

      <a-form-model-item prop="company_id" label="Empresa">
        <a-select v-model="form.company_id" placeholder="Selecione a Empresa">
          <div v-if="companies.length === 0">
            Por favor adicione ao menos uma empresa antes de criar um contato
          </div>
          <a-select-option v-for="company in companies" :key="company.id" :value="company.id">
              {{ company.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item
        v-for="(phone, index) in form.phones"
        :key="phone.key"
        :label="index === 0 ? 'Telefones' : ''"
        :prop="'phones.' + index + '.value'"
      >
        <a-input
          v-mask="'(##) ####-####'"
          v-model="phone.value"
          placeholder="Por favor escreva seu telefone"
          style="width: 80%; margin-right: 8px"
        />
        <a-icon
          v-if="form.phones.length > 1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="form.phones.length === 1"
          @click="removePhone(phone)"
        />
      </a-form-model-item>
      <a-form-model-item >
        <a-button type="dashed" @click="addPhone">
          <a-icon type="plus" /> Adicionar Telefone
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ContactForm',
  props: [
    'form'
  ],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        name: [{
          required: true, message: 'Por favor preencha o nome', trigger: 'blur'
        }],
        company_id: [{
          required: true, message: 'Por favor escolha a empresa', trigger: 'blur'
        }],
        phones: [{
          required: true, message: 'Por favor preencha ao menos um número', trigger: 'blur'
        }]
      }
    };
  },
  computed: {
    ...mapState({
      companies: state => state.company.companies
    })
  },
  methods: {
    validate: () => {
      this.$refs.companyForm.validate((isValid) => {
        this.$emit('refForm', isValid);
      });
    },
    removePhone(item) {
      let index = this.form.phones.indexOf(item);
      if (index !== -1) {
        this.form.phones.splice(index, 1);
      }
    },
    addPhone() {
      this.form.phones.push({
        value: '',
        key: Date.now()
      });
    }
  }
};
</script>

<style scoped>

</style>
