<template>
    <div>
        <h1>List</h1>
        <hr>
        <div class="row">
            <div class="input-field col s12">
                <select ref="select" v-model="filter">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="completed">completed</option>
                    <option value="active">active</option>
                    <option value="outdated">outdated</option>
                </select>
                <label>Task filter</label>
            </div>
        </div>
        <table v-if="tasks.length">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(task, idx) of displayTasks"
                    :key="task.id"
                >
                    <td>{{idx + 1}}</td>
                    <td>
                        <router-link :to="'/task/' + task.id">{{task.title}}</router-link>
                    </td>
                    <td>
                        <p v-for="tg of task.tags">{{tg.tag}}</p>
                    </td>
                    <td class="crop-td"><div class="text-desc">{{task.description}}</div></td>
                    <td>{{new Date(task.date).toLocaleDateString()}}</td>
                    <td>{{task.status}}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>No tasks yet</p>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                filter: null
            }
        },
        computed: {
            tasks() {
                return this.$store.getters.tasks
            },
            displayTasks() {
                return this.tasks.filter(t => {
                    if (!this.filter) {
                        return true;
                    }
                    return t.status === this.filter;
                })
            }
        },
        mounted() {
            M.FormSelect.init(this.$refs.select)
        }
    }
</script>

<style scoped>
    .crop-td {
        max-width: 240px;
    }
    .text-desc {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
</style>
