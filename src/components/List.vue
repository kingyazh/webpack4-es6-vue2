<template>
  <el-container>
    <el-main>
      <h4 class="title01">查 询</h4>
      <el-form :model="ruleForm" ref="ruleForm" label-width="130px" status-icon size="mini">
        <el-row :gutter="20">
          <el-col :span="10" :offset="2">
            <el-form-item label="操作单号" prop="opCode">
              <el-input style="width:400px" v-model="ruleForm.opCode" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="团号/订单号" prop="code">
              <el-input style="width:400px" v-model="ruleForm.code" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="2">
            <el-form-item label="国家" prop="country">
              <el-input style="width:400px" v-model="ruleForm.country" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="签证类型" prop="visaType">
              <el-select style="width:400px" v-model="ruleForm.visaType" placeholder="请选择">
                <el-option v-for="item in visaOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="2">
            <el-form-item label="送签地" prop="signPlace">
              <el-input style="width:400px" v-model="ruleForm.signPlace" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="操作状态" prop="status">
              <el-input style="width:400px" v-model="ruleForm.status" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:right" :span="20" :offset="2">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h4 class="title01">列 表</h4>
      <el-table :data="tableData5" size="mini" border style="width: 100%" header-cell-class-name="table-head-th">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table size="mini" :data="props.row.details" border style="width: 100%;" header-cell-class-name="table-head-th">
              <el-table-column align="center" prop="id" label="日期" width="180">
              </el-table-column>
              <el-table-column align="center" prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column align="center" prop="desc" label="地址">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品 ID" prop="id">
        </el-table-column>
        <el-table-column align="center" label="商品名称" prop="name">
        </el-table-column>
        <el-table-column align="center" label="描述" prop="desc">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="40000" style="padding:10px;text-align:right">
      </el-pagination>
    </el-main>
  </el-container>
</template>
<style>
.el-table__expanded-cell {
  background: #f9f9dd;
}

.el-table__expanded-cell:hover {
  background-color: #f9f9dd !important;
}

.el-table--enable-row-hover
  .el-table__body
  tr:hover
  > .el-table__expanded-cell {
  background: #f9f9dd;
}
</style>

<script>
export default {
  data() {
    return {
      tableData5: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          details: [
            {
              id: "12987122",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987125",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987126",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          details: [
            {
              id: "12987122",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987125",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987126",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          details: [
            {
              id: "12987122",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987125",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987126",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          details: [
            {
              id: "12987122",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987125",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987126",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        }
      ],
      visaOptions: [
        {
          value: 1,
          label: "签证类型1"
        },
        {
          value: 2,
          label: "签证类型2"
        }
      ],
      ruleForm: {
        opCode: "",
        code: "",
        country: "",
        visaType: "",
        signPlace: "",
        status: ""
      },
      currentPage4: 4
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(this.$router);
      if (index == 0) {
        this.$router.push({
          path: `/VisaInfo/111/${index}`
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>