<template>
    <nav>
        <div class="nav-wrapper teal lighten-2">
            <div class="container">
                <router-link to="/" class="brand-logo">Tasks</router-link>
                <ul class="right hide-on-med-and-down">
                    <li><router-link to="/" exact active-class="active">
                        <a href="#">Create task</a>
                    </router-link></li>
                    <li><router-link to="/list" active-class="active">
                        <a href="#">List</a>
                    </router-link></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>
