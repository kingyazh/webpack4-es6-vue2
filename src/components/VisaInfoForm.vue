<template>
  <el-container>
    <el-header align="middle">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <template v-for="(form,index) in formRulesInfo">
          <el-menu-item :key="index" :index="index+''">{{form.title}}</el-menu-item>
        </template>
      </el-menu>
    </el-header>
    <el-main>
      <el-form ref="form" label-position="right" :model="formdata" size="mini" label-width="140px">
        <template v-for="(form,index) in formRulesInfo">
          <div :key="index">
            <h4 class="title02" :id="baseHash + '#' + index">{{form.title}}</h4>
            <div>
              <template v-for="(row, rowIndex) in form.rows">
                <el-form-item :key="rowIndex" :label="row.row_label" :required="row.star_tag == 1" label-width="20vw">
                  <span slot="label">
                    <el-tooltip :content="row.tool_tip" placement="left">
                      <span>{{row.row_label}}</span>
                    </el-tooltip>
                  </span>
                  <template v-for="(com, comIndex) in row.components">
                    <comp :key="comIndex" :root="com" :formdata="formdata" />
                  </template>
                </el-form-item>
              </template>
            </div>
          </div>
        </template>
        <el-row type="flex" justify="center">
          <el-col :span="6" class="btn-group">
            <el-form-item label-width="auto">
              <el-button type="primary" @click="submit">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import comp from "./Comp";
export default {
  components: { comp },
  data() {
    return {
      formRulesInfo: [
        {
          title: "个人信息",
          color: "#ff0",
          rows: [
            {
              row_label: "姓名",
              star_tag: 1,
              tool_tip: "客人姓名信息",
              components: [
                {
                  type: "text",
                  name: "name",
                  label: "",
                  required: 1,
                  translatable: 1,
                  limit: "[0-9]+",
                  items: []
                }
              ]
            },
            {
              row_label: "曾用名",
              star_tag: 1,
              tool_tip: "客人姓名信息",
              components: [
                {
                  type: "text",
                  name: "old_name",
                  label: "",
                  required: 1,
                  translatable: 0,
                  limit: "[0-9]+",
                  items: []
                }
              ]
            },
            {
              row_label: "个人简介",
              star_tag: 1,
              tool_tip: "客人姓名信息",
              components: [
                {
                  type: "textfield",
                  name: "desc",
                  label: "",
                  required: 1,
                  translatable: 0,
                  limit: ".{1,100}",
                  items: []
                }
              ]
            },
            {
              row_label: "生日",
              star_tag: 1,
              tool_tip: "客人姓名信息",
              components: [
                {
                  type: "date",
                  name: "birth",
                  label: "",
                  required: 1,
                  translatable: 0,
                  limit: "",
                  items: []
                }
              ]
            },
            {
              row_label: "录指纹时间",
              star_tag: 1,
              tool_tip: "客人姓名信息",
              components: [
                {
                  type: "time",
                  name: "signTime",
                  label: "",
                  required: 1,
                  translatable: 0,
                  limit: "",
                  items: []
                }
              ]
            },
            {
              row_label: "日期加时间",
              star_tag: 1,
              tool_tip: "客人姓名信息",
              components: [
                {
                  type: "datetime",
                  name: "datetime",
                  label: "",
                  required: 1,
                  translatable: 0,
                  limit: "",
                  items: []
                }
              ]
            },
            {
              row_label: "目的地国家",
              star_tag: 1,
              tool_tip: "客人姓名信息",
              components: [
                {
                  type: "mselect",
                  name: "country",
                  label: "",
                  required: 1,
                  translatable: 0,
                  limit: "",
                  items: [
                    {
                      label: "美国",
                      value: 1,
                      checked: 1
                    },
                    {
                      label: "英国",
                      value: 2,
                      checked: 0
                    },
                    {
                      label: "德国",
                      value: 3,
                      checked: 0
                    },
                    {
                      label: "俄罗斯",
                      value: 4,
                      checked: 0
                    }
                  ]
                }
              ]
            },
            {
              row_label: "支付方式",
              star_tag: 1,
              tool_tip: "客人姓名信息",
              components: [
                {
                  type: "checkbox",
                  name: "pay",
                  label: "",
                  required: 1,
                  translatable: 0,
                  limit: "",
                  items: [
                    {
                      label: "现金",
                      value: 1,
                      checked: 1
                    },
                    {
                      label: "支票",
                      value: 2,
                      checked: 0
                    },
                    {
                      label: "哈哈",
                      value: 3,
                      checked: 0
                    },
                    {
                      label: "其他",
                      value: 4,
                      checked: 0,
                      children: [
                        {
                          type: "text",
                          name: "payTypeOther",
                          label: "其他支付方式",
                          required: 1,
                          translatable: 0,
                          limit: "[a-z]+",
                          items: []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              row_label: "职业",
              star_tag: 0,
              tool_tip: "客人职业信息",
              components: [
                {
                  type: "select",
                  name: "jobType",
                  label: "职业类型",
                  required: 1,
                  translatable: 0,
                  limit: "",
                  items: [
                    {
                      label: "公司",
                      value: 1,
                      checked: 1,
                      children: [
                        {
                          type: "text",
                          name: "corpName",
                          label: "公司名称",
                          required: 1,
                          translatable: 1,
                          limit: "[a-z]+",
                          items: []
                        }
                      ]
                    },
                    {
                      label: "个人",
                      value: 2,
                      checked: 0
                    }
                  ]
                },
                {
                  type: "radio",
                  name: "sex",
                  label: "性别",
                  required: 1,
                  translatable: 0,
                  limit: "",
                  items: [
                    {
                      label: "男",
                      value: 1,
                      checked: 1
                    },
                    {
                      label: "女",
                      value: 2,
                      checked: 0
                    }
                  ]
                },
                {
                  type: "radio",
                  name: "payUser",
                  label: "支付人",
                  required: 1,
                  translatable: 0,
                  limit: "",
                  items: [
                    {
                      label: "自己支付",
                      value: 1,
                      checked: 1
                    },
                    {
                      label: "他人支付",
                      value: 2,
                      checked: 0,
                      children: [
                        {
                          type: "text",
                          name: "payOtherInfo",
                          label: "支付人名字",
                          required: 1,
                          translatable: 1,
                          limit: "[a-z]+",
                          items: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      baseHash: "/VisaInfo/" + this.$route.params.countryId + '/' + this.$route.params.id,
      activeIndex: "0",
      formdata: {}
    };
  },
  methods: {
    handleSelect: function(key, keyPath) {
      this.activeIndex = key;
      location.replace(location.origin + "#" + this.baseHash + "#" + key);
    },
    dealFormData: function(comp, formdata) {
      if (
        ["text", "textfield", "date", "time", "datetime"].indexOf(comp.type) >
        -1
      ) {
        if (comp.translatable == 1) {
          formdata[comp.name + "_cn"] = "";
          formdata[comp.name + "_en"] = "";
        } else {
          formdata[comp.name] = "";
        }
      } else if (
        ["select", "radio", "mselect", "checkbox"].indexOf(comp.type) > -1
      ) {
        const checked = comp.items.filter(item => {
          return item.checked == 1;
        });
        if (["select", "radio"].indexOf(comp.type) > -1) {
          formdata[comp.name] = checked.length > 0 ? checked[0].value : "";
        } else {
          formdata[comp.name] =
            checked.length > 0
              ? checked.map(item => {
                  return item.value;
                })
              : [];
        }
        comp.items.forEach(item => {
          item.children &&
            item.children.forEach(child => {
              this.dealFormData(child, formdata);
            });
        });
      }
    },
    submit: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted: function() {
    console.log(this.formRulesInfo);
    var formdata = {};
    this.formRulesInfo.forEach(form => {
      form.rows.forEach(row => {
        row.components.forEach(comp => {
          this.dealFormData(comp, formdata);
        });
      });
    });
    this.$set(this.$data, "formdata", formdata);
  }
};
</script>
