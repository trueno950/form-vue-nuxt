<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div v-if="!loading" class="col-md-6">
        <div class="card">
          <div class="card-header">Iniciar sesión</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Usuario</label>
                <input
                  v-model="user.username"
                  type="text"
                  class="form-control"
                  id="username"
                  name="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  v-model="user.password"
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="disabledButton"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            ¿No tienes una cuenta?
            <NuxtLink to="/register">Registrate aquí</NuxtLink>
          </div>
        </div>
      </div>
      <Loading v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { validateField } from "../utils/validation";
import { Login, FieldsToValidate, Field, ErrorLogin } from "../types";
import { ValidationType } from "../enums";
import { userService } from "@/api/services";
import { useToast } from "vue-toastification";
const toast = useToast();

const disabledButton = ref<boolean>(true);
const loading = ref<boolean>(false);

const user = reactive<Login>({
  username: "",
  password: "",
});

const errors = reactive<ErrorLogin>({
  username: "",
  password: "",
});

const login = async () => {
  try {
    loading.value = true;
    await userService.login(user);
    localStorage.setItem("user", JSON.stringify(user.username));
    navigateTo("/home");
  } catch (error) {
    loading.value = false;
    toast.error("Verifique sus credenciales");
  } finally {
    loading.value = false;
  }
};

const fieldsToValidate: FieldsToValidate = {
  username: [ValidationType.Required, ValidationType.Username],
  password: [ValidationType.Required, ValidationType.Password],
};

const validateFieldList = (
  value: string,
  validationTypes: FieldsToValidate[string],
  fieldName: string
) => {
  errors[fieldName] =
    validationTypes
      .map((validationType: ValidationType) =>
        validateField(value, validationType)
      )
      .find((error) => error !== "") || "";
};

const areAllErrorsEmpty = (): boolean => {
  return Object.values(errors).some((value) => value !== "");
};

watch(user, (newUser: Field) => {
  for (const field in fieldsToValidate) {
    validateFieldList(newUser[field], fieldsToValidate[field], field);
  }
  disabledButton.value = areAllErrorsEmpty();
});
</script>
