<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow class="col-md-6 col-sm-12">
      <CCol >
        <CCardGroup>
          <CCard class="p-2">
            <CCardBody>
              <CForm  @submit.prevent="submit">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>

                <CInput
                  placeholder="Username"
                  autocomplete="username email"
                  v-model="form.email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                  v-model="form.password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="12" class="text-left d-flex justify-content-between ">
                    <div class="d-flex">
                      <CButton :disabled="this.disabled?'disabled':false" type="submit"  color="primary" class="px-4">Login</CButton>
                      <span v-if="this.disabled" class="loader ml-2"></span>
                    </div>
                    <CButton color="link" class="" :to="'register'">Register</CButton>
                  </CCol>
                </CRow>
              </CForm>
              <div col="12" v-if="error" class="alert alert-danger mt-4">{{error}}</div>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import firebase from "firebase";

export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
            error: null,
            disabled: false,
            loader: true,
        };
    },
    methods: {
        submit() {
            this.error = null;
            this.disabled = true;
            firebase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(data => {
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
