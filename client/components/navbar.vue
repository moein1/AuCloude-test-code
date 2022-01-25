<template>
  <div>
       <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">         
         
        </div>

        <ul class="navbar-nav-left">
          <li>
            <nuxt-link to="/">Dashboard</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/vocab">Vocabelary</nuxt-link>
          </li>         
        </ul>

        <ul class="navbar-nav-right" v-if="!$auth.loggedIn">
          <li>
            <a href="#">
              <img src="img/marker.svg" alt="" />
              <span>Find a store</span>
            </a>
          </li>
          <li><button class="btn btn-dark-outline" @click="openLink('/signin')">Sign in</button></li>
          <li><button class="btn btn-dark" @click="openLink('/signup')" >Join now</button></li>
        </ul>
        <ul v-else>
            <li>
                <span>Welcome {{$auth.user.email}}</span>
            </li>
            <li><button class="btn btn-dark-outline" @click="$auth.logout()" >Logout</button></li>
        </ul>

        <!-- Hamburger Menu -->
        <button type="button" class="hamburger" id="menu-btn" @click="navToggle()">
          <span class="hamburger-top"></span>
          <span class="hamburger-middle"></span>
          <span class="hamburger-bottom"></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu hidden" id="menu">
      <ul>
        <li>
          <nuxt-link to="/">Dashboard</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/vocab">Vocabelary</nuxt-link>
        </li>      
      </ul>

      <div class="mobile-menu-bottom">
        <button class="btn btn-dark-outline" @click="openLink('/signin')">Sign in</button>
        <button class="btn btn-dark" @click="openLink('/signup')">Join now</button>
        <div>
          <a href="#">
            <img src="img/marker.svg" alt="" />
            <span>Find a store</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMethods from '~/mixins/commonMethods.js';
export default {
    methods:{
         navToggle() {
             const btn = document.getElementById('menu-btn')
            const nav = document.getElementById('menu')
            btn.classList.toggle('open')
            nav.classList.toggle('hidden')
            document.body.classList.toggle('no-scroll')
        }
    },
    mixins:[commonMethods]
}
</script>

<style>

</style>