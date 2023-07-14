<template>
    <div class="row">
        <div class="col s6 offset-s3">
            <h1>{{task.title}}</h1>
            <hr>
            <form @submit.prevent="submitHandler">
                <div class="chips" ref="chips"></div>
                <div class="input-field col s6">
                    <textarea style="min-height: 60px" id="description" class="materialize-textarea" v-model="description"></textarea>
                    <label for="description">Description</label>
                    <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
                </div>
                <div class="input-field col s6">
                    <input type="text" class="datepicker" ref="datepicker">
                </div>
                <div v-if="task.status !== 'completed'" class="input-field col s12">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                    <button @click="completeTask" class="btn blue waves-effect waves-light complete-btn" type="button">Complete task</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import M from "materialize-css";

    export default {
        name: "Task",
        computed: {
            task() {
                return this.$store.getters.taskById(+this.$route.params.id);
            }
        },
        data: () => ({
            description: '',
            chips: null,
            date: null
        }),
        mounted() {
            this.description = this.task.description;
            this.chips = M.Chips.init(this.$refs.chips, {
                placeholder: "Enter tags",
                data: this.task.tags
            });
            this.date = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd.mm.yyyy',
                defaultDate: new Date(this.task.date),
                setDefaultDate: true
            });
            setTimeout(() => {
                M.updateTextFields()
            }, 0)
        },
        methods: {
            submitHandler() {
                this.$store.dispatch('updateTask', {
                    id: this.task.id,
                    description: this.description,
                    date: this.date.date
                });
                this.$router.push('/list');
            },
            completeTask() {
                this.$store.dispatch('completeTask', this.task.id);
                this.$router.push('/list');
            }
        },
        destroyed() {
            if (this.date && this.date.destroy) {
                this.date.destroy()
            }

            if (this.chips && this.chips.destroy) {
                this.chips.destroy()
            }
        }
    }
</script>

<style scoped>
    .complete-btn {
        margin-left: 15px;
    }
</style>
