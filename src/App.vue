<template>
  <div id="app">
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header>
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['1']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            <router-link to="/">Contatos</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/company">Empresas</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>

      <a-layout-content style="padding: 50px 50px">
        <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
          <router-view/>
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Contatos ©2020 Criado por Luísa Colombo Camargo
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>

</style>
