<template>
  <div class="container-fluid">
            <div class="row no-gutter">
               
                <div class="col-md-6 d-none d-md-flex bg-image"></div>
                
                <div class="col-md-6 bg-light">
                    <div class="login d-flex align-items-center py-5">
                       
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-10 col-xl-7 mx-auto">
                                    <h3 class="display-4">Log in</h3>
                                    <p class="text-muted mb-4">To use this website you need to log in</p>
                                    <form>
                                        <div class="mb-3">
                                            <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>
                                        <div class="mb-3">
                                            <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                        </div>
                                        <div class="form-check">
                                            <input id="customCheck1" type="checkbox" checked class="form-check-input" />
                                            <label for="customCheck1" class="form-check-label">Remember password</label>
                                        </div>
                                        <div class="d-grid gap-2 mt-2">
                                        <button type="submit" class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm"  >Sign in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import "src/assets/home.css"
export default {
  //
}
</script>

<script>
import axios from "axios";
import bus from "./../bus";
export default {
  data: () => ({
    valid: true,

    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    async submit() {
      return axios({
        method: "post",
        data: {
          email: this.email,
          password: this.password
        },
        url: "/users/login",

        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          window.localStorage.setItem("auth", response.data.token);
          this.$swal("Great!", "You are ready to start!", "success");
          bus.$emit("refreshUser");

          this.$router.push({ name: "Home" });
        })
        .catch(error => {
          const message = error.response.data.message;
          this.$swal("Oh oo!", `${message}`, "error");
          this.$router.push({ name: "Login" });
        });
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
  #container{
    margin:auto;
    width:50%
  }
</style>