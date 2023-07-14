<template>
    <h1>Create task</h1>
    <div class="row">
        <form @submit.prevent="submitHandler">
            <div class="input-field col s6">
                <input id="title" type="text" class="validate" required v-model="title">
                <label for="title">Title</label>
                <span class="helper-text" data-error="Title is required"></span>
            </div>
            <div class="chips col s6" ref="chips"></div>
            <div class="input-field col s6">
                <textarea id="desc" class="materialize-textarea" v-model="description"></textarea>
                <label for="desc">Description</label>
                <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
            </div>
            <div class="input-field col s6">
                <input type="text" class="datepicker" ref="datepicker">
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
        </form>
    </div>
</template>

<script>
import M from 'materialize-css';
export default {
    data: () => ({
        description: '',
        title: '',
        chips: null,
        date: null
    }),
    mounted() {
        this.chips = M.Chips.init(this.$refs.chips, {
            placeholder: "Enter tags"
        });
        this.date = M.Datepicker.init(this.$refs.datepicker, {
            format: 'dd.mm.yyyy',
            defaultDate: new Date(),
            setDefaultDate: true
        });
    },
    methods: {
        submitHandler() {
            const task = {
                title: this.title,
                description: this.description,
                id: Date.now(),
                status: 'active',
                tags: this.chips.chipsData,
                date: this.date.date
            }

            this.$store.dispatch('createTask', task);
            this.$router.push('/list');
        }
    }
}
</script>
