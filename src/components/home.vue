<template>
    <el-container>
        <el-aside>左侧菜单预留</el-aside>
        <el-container>
            <el-main>
                <VisaSearch></VisaSearch>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import VisaSearch from './visaSearch'
export default {
    name: 'Home',
    components: {
        VisaSearch
    }
}
</script>

<style scoped lang="scss">

    .el-aside {
        display: none;
        width: 200px;
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        margin:0 2rem 2rem;
        background-color: #FFFFFF;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

</style>