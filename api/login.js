import serve from "@/until/request";
export function logint(data){
    return serve({
        url:'api/Login/Index',
        method:'post',
        data
    })
}

export function Upassword(data){
    return serve({
        url:'api/Login/ChangePwd',
        method:'post',
        data
    })
}
// export function skyname(pramas){
//     return serve({
//         url:'api/Login/GetVerificationCode?tel=15949081822',
//         method:'get',
//         pramas
//     })
// }

//首页
export function Home(pramas){
    return serve({
        url:'api/Dashboard/FindData',
        method:'get',
        pramas
    })
}
// 统计
export function tongji(data){
    return serve({
        url:'api/Statistics/FirstData',
        method:'post',
        data
    })
}
export function btns(data){
    return serve({
        url:'api/Statistics/ExportExcelData',
        method:'post',
        responseType: "blob",
        data
    })
}
export function xuanxiang(get){
    return serve({
        url:'api/Statistics/FindSelList',
        method:'get',
        get
    })
}
// 过磅
export function guobangList(pramas){
    return serve({
        url:`api/Weighing/FindItem?id=${pramas.id}`,
        method:'get',
        pramas
    })
}
export function select(data){
    return serve({
        url:'api/Weighing/FirstData',
        method:'post',
        data
    })
}
export function liebiao(pramas){
    return serve({
        url:'api/Weighing/FindSelList',
        method:'get',
        pramas
    })
}
//账户
export function ZhList(data){
    return serve({
        url:'api/Account/FindData',
        method:'post',
        data
    })
}
export function ZhOne(pramas){
    return serve({
        url:`api/Account/FindItem?id=${pramas.id}`,
        method:'get',
        pramas
    })
}
export function UpZhList(data){
    return serve({
        url:'api/Account/ToSave',
        method:'post',
        data
    })
}
//状态重置
export function reset(data){
    return serve({
        url:'api/Account/ToResetState',
        method:'post',
        data
    })
}
export function userLise(pramas){
    return serve({
        url:'api/User/UserInfo',
        method:'get',
        pramas
    })
}
export function tuichu(pramas){
    return serve({
        url:'api/Login/LoginOut',
        method:'get',
        pramas
    })
}
// 单位
export function danweiList(data){
    return serve({
        url:'api/Consignee/FindData',
        method:'post',
        data
    })
}
//添加修改
export function danweiAdd(data){
    return serve({
        url:'api/Consignee/ToSave',
        method:'post',
        data
    })
}

// 车辆
export function xiangqing(pramas){
    return serve({
        url:`api/VehicleReservation/FindItem?id=${pramas.id}`,
        method:'get',
        pramas
    })
}
export function IconFace(data){
    return serve({
        url:'api/UploadFile/UplpadVehicleLiscence',
        method:'post',
        headers: {
                "Content-Type": "multipart/form-data",
              },
        data
    })
}
export function IconBack(data){
    return serve({
        url:'api/UploadFile/UplpadVehicleLiscence',
        method:'post',
        data
    })
}
export function CarList(pramas){
    return serve({
        url:'api/VehicleReservation/GetVehicleList',
        method:'get',
        pramas
    })
}
export function CarRes(data){
    return serve({
        url:'api/VehicleReservation/FindData',
        method:'post',
        data
    })
}
export function submitShenpi(data){
    return serve({
        url:'api/VehicleReservation/ToSave',
        method:'post',
        data
    })
}
export function carliebiai(pramas){
    return serve({
        url:'api/VehicleReservation/GetVehicleList',
        method:'get',
        pramas
    })
}
export function quxiao(pramas){
    return serve({
        url:`api/VehicleReservation/ToCancle?id=${pramas.id}`,
        method:'get',
        pramas,
    })
}
export function shePi(data){
    return serve({
        url:'api/VehicleReservation/ToApprove',
        method:'post',
        data
    })
}

// 车辆管理
export function CarComList(data){
    return serve({
        url:'api/Vehicle/FindData',
        method:'post',
        data
    })
}
export function CarallList(pramas){
    return serve({
        url:'api/Vehicle/GetConsigneeList',
        method:'get',
        pramas
    })
}
export function addCarList(data){
    return serve({
        url:'api/Vehicle/ToSave',
        method:'post',
        data
    })
}


// 地磅
export function dibangList(data){
    return serve({
        url:'api/Weighbridge/FindData',
        method:'post',
        data
    })
}
export function dibangAdd(data){
    return serve({
        url:'api/Weighbridge/ToSave',
        method:'post',
        data
    })
}
// 物资
export function WzList(data){
    return serve({
        url:'api/MaterialItem/FirstData',
        method:'post',
        data
    })
}
export function WzAdd(data){
    return serve({
        url:'api/MaterialItem/ToSave',
        method:'post',
        data
    })
}
export function denglu(data){
    return serve({
        url:'api/MaterialItem/ToResetState',
        method:'post',
        data
    })
}
export function OneList(data){
    return serve({
        url:'api/MaterialItem/FindSuperiorList',
        method:'post',
        data
    })
}
// 收费
export function sfPeizhi(data){
    return serve({
        url:'api/Charging/ToSave',
        method:'post',
        data
    })
}
export function sfList(data){
    return serve({
        url:'api/Charging/FindData',
        method:'post',
        data
    })
}
// 企业信息
export function qiyeUser(pramas){
    return serve({
        url:'api/Company/GetUserList',
        method:'get',
        pramas
    })
}
export function qiyeUpdate(data){
    return serve({
        url:'api/Company/ToSave',
        method:'post',
        data
    })
}
export function qiyelist(pramas){
    return serve({
        url:'api/User/UserInfo',
        method:'get',
        pramas
    })
}

