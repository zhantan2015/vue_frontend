<template>

    <div class="logs__outer">
        <table>
            <thead>
                <tr>
                    <th>path</th>
                    <th>sql</th>
                    <th>time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>/</td>
                    <td>SELECT *</td>
                    <td>{{ new Date().toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>
<script setup>
</script>
<style scoped lang="less">
table {
    border-collapse: collapse;
    border: 1px solid gray;
    width: 100%;
    font-size: 1rem;

    tr {
        width: 100%;

        th {
            border: 1px solid gray;
        }

        td {
            text-align: center;
            border: 1px solid gray
        }
    }
}
</style>