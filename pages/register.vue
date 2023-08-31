<template>
  <div class="container mt-5 mb-5">
    <div v-if="!loading" class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Registro</div>
          <div class="card-body">
            <form @submit.prevent="registerUser">
              <div class="mb-3">
                <label for="firstName" class="form-label">Nombre</label>
                <input
                  v-model="user.name"
                  type="text"
                  class="form-control"
                  id="firstName"
                  name="firstName"
                  required
                />
                <InputError :errorMessage="errors.name" />
              </div>
              <div class="mb-3">
                <label for="lastname" class="form-label">Apellido</label>
                <input
                  v-model="user.lastname"
                  type="text"
                  class="form-control"
                  id="lastname"
                  name="lastname"
                  required
                />
                <input-error :errorMessage="errors.lastname" />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label"
                  >Nombre de usuario</label
                >
                <input
                  v-model="user.username"
                  type="text"
                  class="form-control"
                  id="username"
                  name="username"
                  required
                />
                <InputError :errorMessage="errors.username" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input
                  v-model="user.email"
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  required
                />
                <InputError :errorMessage="errors.email" />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Teléfono</label>
                <input
                  v-model="user.phone"
                  type="phone"
                  class="form-control"
                  id="phone"
                  name="phone"
                  required
                />
                <InputError :errorMessage="errors.phone" />
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
                <InputError :errorMessage="errors.password" />
              </div>
              <div class="mb-3">
                <label for="password-confirm" class="form-label"
                  >Confirmar Contraseña</label
                >
                <input
                  v-model="user.confirmPassword"
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  required
                />
                <InputError :errorMessage="errors.confirmPassword" />
              </div>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="disabledButton"
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            ¿Ya tienes una cuenta?
            <NuxtLink to="/">Inicia sesión aquí</NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { validateField } from "../utils/validation";
import { User, FieldsToValidate, Field, Error } from "../types";
import { ValidationType } from "../enums";
import { userService } from "@/api/services";
import { useToast } from "vue-toastification";
const toast = useToast();

const disabledButton = ref<boolean>(true);
const loading = ref<boolean>(false);

const user = reactive<User>({
  name: "",
  lastname: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive<Error>({
  name: "",
  lastname: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const registerUser = async () => {
  try {
    loading.value = true;
    const response = await userService.registerUser(user);
    toast.success("Usuario registrado correctamente");
    navigateTo("/");
  } catch (error) {
    loading.value = false;
    toast.error("Se produjo un error al tratar de guardar el usuario");
  } finally {
    loading.value = false;
  }
};

const fieldsToValidate: FieldsToValidate = {
  name: [ValidationType.Required, ValidationType.OnlyLetters],
  lastname: [ValidationType.Required, ValidationType.OnlyLetters],
  username: [ValidationType.Required, ValidationType.Username],
  email: [ValidationType.Required, ValidationType.Email],
  phone: [
    ValidationType.Required,
    ValidationType.Phone,
    ValidationType.OnlyNumbers,
  ],
  password: [ValidationType.Required, ValidationType.Password],
  confirmPassword: [ValidationType.Required, ValidationType.PasswordMatch],
};

const validateFieldList = (
  value: string,
  validationTypes: FieldsToValidate[string],
  fieldName: string
) => {
  errors[fieldName] =
    validationTypes
      .map((validationType: ValidationType) =>
        validateField(value, validationType, user.password)
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

<style scoped></style>
