<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Bienvenido</div>
          <div class="card-body">
            <p>Hola, {{ username }}. ¡Bienvenido a tu página de inicio!</p>
            <button @click="logout" class="btn btn-danger">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const username = computed(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    return parsedUser;
  } else {
    return "";
  }
});
const logout = async () => {
  localStorage.removeItem("user");
  navigateTo("/");
};
</script>
