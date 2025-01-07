<template>
    <ContentField>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>玩家A</th>
                    <th>玩家B</th>
                    <th>对战结果</th>
                    <th>对战时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in recordList" :key="record.record.id">
                    <td>
                        <img :src="record.a_photo" class="record-user-class">
                        <span class="record-user-username">{{ record.a_username }}</span>
                    </td>
                    <td>
                        <img :src="record.b_photo" class="record-user-class">
                        <span class="record-user-username">{{ record.b_username }}</span>
                    </td>
                    <td>{{ record.result }}</td>
                    <td>{{ record.record.createtime }}</td>
                    <td>
                        <button class="btn btn-danger" @click="openRecord(record.record.id)">查看录像</button>
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
import router from '../../router';
export default {
    components: {
        ContentField
    }, setup() {
        const store = useStore();
        const recordList = ref([]);
        const pages = ref([]);
        let currentPage = 1;
        let totalRecord = 0;
        const updatePages = () => {
            let max_pages = parseInt(Math.ceil(totalRecord / 5));
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
            let max_pages = parseInt(Math.ceil(totalRecord / 5));
            if (page < 1 || page > max_pages) return;
            pull_page(page);
        }
        const pull_page = page => {
            currentPage = page;
            $.ajax({
                url: "/api/record/getlist/",
                data: {
                    page,
                },
                type: "get",
                contentType: 'application/json',
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    recordList.value = resp.items
                    totalRecord = resp.records_count
                    updatePages();
                    console.log(resp);
                },
            })
        }
        const string2map = map => {
            let g = [];
            for (let i = 0, k = 0; i < 13; i++) {
                let line = [];
                for (let j = 0; j < 14; j++, k++) {
                    if (map[k] == '0')
                        line.push(0);
                    else if (map[k] == '1')
                        line.push(1);
                }
                g.push(line);
            }
            return g;
        }
        const openRecord = recordId => {
            for (const recordItem of recordList.value) {
                if (recordItem.record.id === recordId) {
                    store.commit('updateIsRecord', true);
                    store.commit('updateGame', {
                        map: string2map(recordItem.record.map),
                        a_id: recordItem.record.aid,
                        a_sx: recordItem.record.asx,
                        a_sy: recordItem.record.asy,
                        b_id: recordItem.record.bid,
                        b_sx: recordItem.record.bsx,
                        b_sy: recordItem.record.bsy,
                    });
                    store.commit('updateStep', {
                        a_step: recordItem.record.asteps,
                        b_step: recordItem.record.bsteps,
                    });
                    store.commit("updateRecordLoser", recordItem.record.loser);
                    router.push({ name: 'RecordContent', params: { recordId } });
                    break;
                }
            }
        }
        pull_page(currentPage);
        return {
            recordList,
            pull_page,
            currentPage,
            totalRecord,
            openRecord,
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