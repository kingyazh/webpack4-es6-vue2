<template>
    <el-header>
        <el-row :gutter="24">
            <el-col :span="6"><div class="header-title">签证平台</div></el-col>
            <el-col :span="18">
                <div class="header-login">
                    <span>您好，凯撒旅游国际旅行社：xxxxx</span>
                    <el-button>修改密码</el-button>
                    <el-button>退出系统</el-button>
                </div>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>

</script>

<style scoped lang="scss">
    .el-header, .el-footer {
        background-color: #409EFF;
        color: #FFFFFF;
        text-align: center;
        line-height: 60px;
    }

    .header-title{
        font-size: 1.5rem;
    }
    .header-login{
        text-align: right;
        span{
            display: inline-block;
            padding: 0 1rem;
        }
    }
</style>