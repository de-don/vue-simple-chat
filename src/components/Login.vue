<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div v-if="page=='login'" class="column is-4 is-offset-4">
          <h1 class="title has-text-gray">Login</h1>
          <div class="box">
            <form @submit.prevent="login">
              <div class="field">
                <div class="control">
                  <input class="input" type="email" placeholder="Email" v-model="email" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Password" v-model="password" autofocus="">
                </div>
              </div>

              <p class="help is-danger" v-if="loginError">{{ loginError }}</p>
              <button type="submit" class="button is-block is-info is-fullwidth">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a @click="page='signup'">Sign Up</a>
          </p>
        </div>

        <div v-if="page=='signup'" class="column is-4 is-offset-4">
          <h1 class="title has-text-gray">Sign Up</h1>
          <div class="box">
            <form @submit.prevent="signup">
              <div class="field">
                <div class="control">
                  <input class="input" type="email" placeholder="Email" v-model="email" autofocus="" v-validate="'required|email'" name="email">
                  <p class="help is-danger">{{ errors.first('email') }}</p>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <div class="control">
                    <input class="input" type="username" placeholder="Username" v-model="username" autofocus="" v-validate="'required'" name="username">
                    <p class="help is-danger">{{ errors.first('username') }}</p>
                  </div>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <div class="control">
                    <input class="input" type="password" placeholder="Password" v-model="password" autofocus="" v-validate="'required|min:6'" name="password">
                    <p class="help is-danger">{{ errors.first('password') }}</p>
                  </div>
                </div>
              </div>

              <p class="help is-danger" v-if="loginError">{{ loginError }}</p>
              <button type="submit" class="button is-block is-info is-fullwidth">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a @click="page='login'">Login</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {FirebaseDb, FirebaseAuth} from '../library/Database';


export default {
  name: 'Login',
  data() {
    return {
      page: 'login',
      email: '',
      password: '',
      username: '',
      loginError: '',
    }
  },
  methods: {
    login() {
      FirebaseAuth.signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          this.loginError = error.message;
        });
    },
    signup () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          FirebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
            .then((data) => {
              FirebaseDb.ref('users/' + data.user.uid).set({
                name: this.username,
              });
            });
        }
      });
    },
  },
  created() {
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('SET_LOGGEDIN', { uid: user.uid, email: user.email });

        FirebaseDb.ref('users/' + user.uid)
          .once('value')
          .then((data) => {
            this.$store.commit('SET_USERNAME', data.val().name);
          });

        this.$router.push('/chat');
      }
    });
  }
};
</script>

<style scoped>

</style>
