<template>
  <div>
    <a-form-model :model="form" ref="companyEditForm" :rules="rules">
      <a-form-model-item prop="name" label="Nome">
        <a-input v-model="form.name" />
      </a-form-model-item>

      <a-form-model-item prop="city" label="Município">
        <a-input v-model="form.city" />
      </a-form-model-item>

      <a-form-model-item v-if="form.type === documentType.CPF" prop="document" label="Número do Documento">
        <a-input disabled v-model="form.document" v-mask="'###.###.###-##'" />
      </a-form-model-item>

      <a-form-model-item v-if="form.type === documentType.CNPJ" prop="document" label="Número do Documento">
        <a-input disabled v-model="form.document" v-mask="'##.###.###/####-##'" />
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
        <a-input v-model="form.rg" />
      </a-form-model-item>

      <a-form-model-item prop="fantasyName" v-if="form.type === documentType.CNPJ" label="Nome Fantasia">
        <a-input v-model="form.fantasyName" />
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
                Deletar Empresa
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
import documentType from '../helpers/constants/documentType';
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR';
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'CompanySeeMore',
  props: [
    'form', 
    'visible'
  ],
  data() {
    return {
      loading: true,
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
        rg: [{
          required: this.form.type === documentType.CPF, message: 'Por favor preencha o RG', trigger: 'blur'
        }, {
          message: 'O RG precisa ser composto por números apenas', trigger: 'blur', pattern: /^[0-9]+$/
        }],
        fantasyName: [{
          required: this.form.type === documentType.CNPJ, message: 'Por favor preencha o Nome Fantasia', trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    ...mapActions('company', ['updateCompany', 'deleteCompany', 'getCompany']),

    async onDelete() {
      try {
        if (this.form) {
          await this.deleteCompany(this.form.companyId)
            .then(() => {
              this.$swal({
                icon: 'success',
                title: 'Empresa excluída com sucesso!'
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
          let newData = {
            ...this.form,
            fantasy_name: this.form.fantasyName,
            key: this.form.companyId
          };

          newData.document = newData.document.replace(/[^0-9]+/g, '');
          newData.birthday = moment(newData.birthday).format('YYYY-MM-DD');

          await this.updateCompany(newData)
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
