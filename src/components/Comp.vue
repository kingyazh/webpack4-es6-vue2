<template>
    <div>
        <el-row type="flex" :gutter="20">
            <template v-if="root.type == 'text' && root.translatable == 1">
                <el-col :span="10">
                    <el-form-item :label="root.label" :prop="root.name+'_cn'" :rules="valid(root)">
                        <el-input v-model="formdata[root.name+'_cn']" placeholder="中文"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="" :prop="root.name+'_en'" :rules="valid(root)">
                        <el-input v-model="formdata[root.name+'_en']" placeholder="英文"></el-input>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'text' && root.translatable == 0">
                <el-col :span="10">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-input v-model="formdata[root.name]" :placeholder="root.label"></el-input>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'date'">
                <el-col :span="10">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-date-picker style="width:100%" v-model="formdata[root.name]" align="right" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'datetime'">
                <el-col :span="10">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-date-picker style="width:100%" v-model="formdata[root.name]" align="right" type="datetime" placeholder="选择日期和时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'time'">
                <el-col :span="10">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-time-picker style="width:100%" v-model="formdata[root.name]" placeholder="任意时间">
                        </el-time-picker>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'textfield'">
                <el-col :span="10">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-input type="textarea" :rows="3" v-model="formdata[root.name]" :placeholder="root.label"></el-input>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'select'">
                <el-col :span="10">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-select style="width: 100%;" clearable v-model="formdata[root.name]" :placeholder="root.label">
                            <el-option v-for="item in root.items" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'mselect'">
                <el-col :span="10">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-select style="width: 100%;" multiple collapse-tags v-model="formdata[root.name]" :placeholder="root.label">
                            <el-option v-for="item in root.items" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'radio'">
                <el-col :span="20">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-radio v-for="item in root.items" v-model="formdata[root.name]" :key="item.value" :label="item.value" border>{{item.label}}</el-radio>
                    </el-form-item>
                </el-col>
            </template>
            <template v-if="root.type == 'checkbox'">
                <el-col :span="20">
                    <el-form-item :label="root.label" :prop="root.name" :rules="valid(root)">
                        <el-checkbox-group v-model="formdata[root.name]">
                            <el-checkbox v-for="item in root.items" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
        <template v-for="(child, index) in children">
            <comp :key="index" :root="child" :formdata="formdata" />
        </template>
    </div>
</template>
<script>
export default {
  name: "comp",
  props: ["root", "formdata"],
  data() {
    return {};
  },
  computed: {
    children: function() {
      var val = [];
      if (this.root.type == "select" || this.root.type == "radio") {
        val.push(this.formdata[this.root.name]);
      } else if (this.root.type == "mselect" || this.root.type == "checkbox") {
        val = val.concat(this.formdata[this.root.name]);
      }
      this.root.items
        .filter(item => {
          return val.indexOf(item.value) < 0;
        })
        .forEach(item => {
          item.children &&
            item.children.forEach(child => {
              this.clearFormData(child);
            });
        });
      var children = [];
      this.root.items
        .filter(item => {
          return val.indexOf(item.value) > -1;
        })
        .forEach(item => {
          if (item.children) {
            children = children.concat(item.children);
          }
        });
      return children;
    }
  },
  methods: {
    valid: function(data) {
      const valids = [];
      if (data.required) {
        valids.push({
          required: true,
          message: "此为必填项",
          trigger: "change"
        });
      }
      valids.push({
        validator: (rule, value, callback) => {
          if (new RegExp(data.limit).test(value) == false) {
            callback(new Error("输入不符合要求"));
          } else {
            callback();
          }
        },
        trigger: "change"
      });
      return valids;
    },
    clearFormData: function(comp) {
      if (comp.translatable == 1) {
        this.formdata[comp.name + "_cn"] = "";
        this.formdata[comp.name + "_en"] = "";
      } else {
        this.formdata[comp.name] = "";
      }
    }
  }
};
</script>
