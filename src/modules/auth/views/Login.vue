<template>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.senha"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // name: 'login',
  data: () => ({
    form: {
      email: '',
      senha: ''
    }

  }),
  // created () {
  //   // executa a action passando as informacoes -  o commit executa a mutation - a mutation altera o state
  //   this.ActionSetUser({ name: 'fulano', email: 'fulano@email.com' })
  // },
  methods: {
    ...mapActions('auth', ['ActionDoLogin']),
    async submit () {
      try {
        // chama a action passando os dados do form
        await this.ActionDoLogin(this.form)
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
        alert(error.data ? error.data.message : 'NAO FOI POSSIVEL FAZER LOGIN')
      }
      console.log(this.form)
    }
  },
  props: {
    source: String
  }

}
</script>

<style>

</style>
