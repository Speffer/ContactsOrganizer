<template>
  <div>
    <a-form-model :model="form" ref="contactEditForm" :rules="rules">
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
        :key="phone.id"
        :label="index === 0 ? 'Telefones' : ''"
        :prop="'phones.' + index + '.number'"
      >
        <a-input
          v-mask="'(##) ####-####'"
          v-model="phone.number"
          disabled
          placeholder="Por favor escreva seu telefone"
          style="width: 80%; margin-right: 8px"
        />
      </a-form-model-item>

      <a-form-model-item
        v-for="(phone, index) in newPhones"
        :key="index"
        :prop="'phones.' + index + '.number'"
      >
        <a-input
          v-mask="'(##) ####-####'"
          v-model="phone.number"
          placeholder="Por favor escreva seu telefone"
          style="width: 80%; margin-right: 8px"
        />
        <a-icon
          v-if="newPhones.length > 1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="newPhones.length === 1"
          @click="removePhone(phone)"
        />
      </a-form-model-item>

      <a-form-model-item >
        <a-button type="dashed" @click="addPhone">
          <a-icon type="plus" /> Adicionar Telefone
        </a-button>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 14 }">
        <a-button type="primary" @click="onSubmit">
          <a-icon type="edit" :style="{ fontSize: '110%'}"/>
          Salvar Edição
        </a-button>

        <a-popconfirm
            title="Certeza que quer deletar?"
            @confirm="() => onDelete()"
            ok-text="Sim!" 
            cancel-text="Não, cancelar."
          >
            <a-tooltip>
              <template slot="title">
                Deletar Contato
              </template>
              <a-button type="danger" style="margin-left: 10px;">
                <a-icon type="delete" :style="{ fontSize: '110%'}"/>
              </a-button>
            </a-tooltip>
          </a-popconfirm>
        
      </a-form-model-item>
        
    </a-form-model>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ContactSeeMore',
  props: [
    'form', 
    'visible'
  ],
  data() {
    return {
      loading: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      newPhones: [],
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
  mounted: function() {
    this.$store.dispatch('company/storeCompanies')
      .then(() => { this.loading = false });
  },
  methods: {
    ...mapActions('contact', ['updateContact', 'deleteContact', 'getContact']),

    removePhone(item) {
      let index = this.newPhones.indexOf(item);
      if (index !== -1) {
        this.newPhones.splice(index, 1);
      }
    },
    addPhone() {
      this.newPhones.push({
        value: '',
        key: Date.now()
      });
    },

    async onDelete() {
      try {
        if (this.form) {
          await this.deleteContact(this.form.id)
            .then(() => {
              this.$swal({
                icon: 'success',
                title: 'Contato excluído com sucesso!'
              });
              this.visible && this.visible();
            })
            .catch(e => this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: e
            }));
        }
      } catch (e) {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: e
        });
      }
    },

    async onSubmit() {
      try {
        if (this.form) {
          let phonesData = [];

          if (this.newPhones.length > 0) {
            this.newPhones.forEach((phone, index) => {
              phonesData.push(phone.number.replace(/[^0-9]+/g, ''));
            });
          }

          this.form.phones = phonesData;

          await this.updateContact(this.form)
            .then(() => {
              this.$swal({
                icon: 'success',
                title: 'Empresa editada com sucesso!'
              });
              this.visible && this.visible();
            })
            .catch(e => this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo deu errado.'
            }));
        }
      } catch (e) {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado.'
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
