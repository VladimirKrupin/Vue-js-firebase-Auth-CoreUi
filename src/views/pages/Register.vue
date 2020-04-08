<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm @submit.prevent="submit">
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username"
                  v-model="form.name"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  v-model="form.email"
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                  v-model="form.password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>

                <div class="d-flex">
                  <button v-if="!success" type="submit" :disabled="this.disabled?'disabled':false" class="btn btn-success btn-block col-md-4">Create Account</button>
                  <span v-if="this.disabled" class="loader ml-2"></span>
                </div>
                <div v-if="error" class="alert alert-danger mt-4">{{error}}</div>
                <div v-if="success" class="alert alert-success mt-4">{{success}}</div>
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
              <CCol col="12 p-0" class="text-right d-flex justify-content-between">
                <CButton color="link" class="px-0" :to="'login'">Login</CButton>
              </CCol>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
  import firebase from "firebase";

  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          password: ""
        },
        error: null,
        success: null,
        disabled: false,
      };
    },
    methods: {
      submit() {
        this.success = null;
        this.error = null;
        this.disabled = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            this.success = 'Success!';
            localStorage.setItem('access_token',data.user.l);
            this.$router.push({ name: "Dashboard" });
          })
          .catch(err => {
            this.disabled = false;
            this.error = err.message;
          });
      }
    }
  };
</script>
