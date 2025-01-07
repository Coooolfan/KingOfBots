<template>
    <ContentField>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>玩家</th>
                    <th>天梯分</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in userList" :key="user.id">
                    <td>
                        <img :src="user.photo" class="record-user-class">
                        <span class="record-user-username">{{ user.username }}</span>
                    </td>
                    <td>
                        {{ user.rating }}
                    </td>
                </tr>
            </tbody>
        </table>
        <nav>
            <ul class="pagination" style="float: right;">
                <li class="page-item"><a class="page-link" @click="clickPage(-2)" href="#">上一页</a></li>
                <li class="page-item" :class="page.is_active" v-for="page in pages" :key="page.number"
                    @click="clickPage(page.number)">
                    <a class="page-link" :class="page.is_active" href="#">{{ page.number }}</a>
                </li>
                <li class="page-item"><a class="page-link" @click="clickPage(-1)" href="#">下一页</a></li>
            </ul>
        </nav>
    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue';
import { useStore } from 'vuex';
import $ from 'jquery';
import { ref } from 'vue';
export default {
    components: {
        ContentField
    }, setup() {
        const store = useStore();
        const userList = ref([]);
        const pages = ref([]);
        let currentPage = 1;
        let totalUser = 0;
        const updatePages = () => {
            let max_pages = parseInt(Math.ceil(totalUser / 5));
            pages.value = [];
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                if (i >= 1 && i <= max_pages) {
                    pages.value.push({
                        number: i,
                        is_active: i === currentPage ? "active" : "",
                    });
                }
            }
        }
        const clickPage = page => {
            if (page === -2) page = currentPage - 1;
            if (page === -1) page = currentPage + 1;
            let max_pages = parseInt(Math.ceil(totalUser / 5));
            if (page < 1 || page > max_pages) return;
            pull_page(page);
        }
        const pull_page = page => {
            currentPage = page;
            $.ajax({
                url: "http://localhost:8080/ranklist/getlist/",
                data: {
                    page,
                },
                type: "get",
                contentType: 'application/json',
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    userList.value = resp.users
                    totalUser = resp.users_count
                    updatePages();
                    console.log(resp);
                },
            })
        }
        pull_page(currentPage);
        return {
            userList,
            pull_page,
            currentPage,
            totalUser,
            pages,
            clickPage
        }
    }
}
</script>
<style scoped>
.record-user-class {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.record-user-username {
    font-size: 20px;
}
</style>