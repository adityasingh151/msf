import{r as o,u as w,D as E,j as e,L as C,R as l,E as T,g as D,b as m,n as L,p as k}from"./index-C1Md3IU_.js";import{u as q}from"./index.esm-CSBi2Yp2.js";import{S as R}from"./Saving-5cbZdhLL.js";import{S as F}from"./SuccessNotification-BG_7mmcG.js";const $=()=>{var x;const{register:u,handleSubmit:h,setValue:s,reset:p,formState:{errors:r}}=q(),[b,d]=o.useState(!1),[g,j]=o.useState(!0),[N,n]=o.useState(!1),[S,c]=o.useState(!1),v=w(),t=(x=E().state)==null?void 0:x.editData;o.useEffect(()=>{t&&(s("title",t.title),s("date",t.date),s("location",t.location),s("description",t.description)),j(!1)},[t,s]);const y=async a=>{d(!0);const f=D();try{if(t){const i=m(f,`conferences/${t.id}`);await L(i,a)}else{const i=m(f,"conferences");await k(i,a)}p(),n(!0),setTimeout(()=>{n(!1),v("/admin/view/conferences")},2e3)}catch(i){console.error("Error saving conference: ",i),c(!0),setTimeout(()=>c(!1),2e3)}finally{d(!1)}};return g?e.jsx(C,{}):e.jsxs(e.Fragment,{children:[b&&e.jsx(R,{}),e.jsxs("div",{className:"container mx-auto p-4",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:t?"Edit Conference":"Add New Conference"}),e.jsxs("form",{onSubmit:h(y),className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Title"}),e.jsx(l,{value:t?t.title:"",onChange:a=>s("title",a),placeholder:"Enter the conference title"}),r.title&&e.jsx("p",{className:"text-red-500 text-xs italic",children:"This field is required"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Date"}),e.jsx("input",{type:"text",...u("date",{required:!0}),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"}),r.date&&e.jsx("p",{className:"text-red-500 text-xs italic",children:"This field is required"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Location"}),e.jsx(l,{value:t?t.location:"",onChange:a=>s("location",a),placeholder:"Enter the conference location"}),r.location&&e.jsx("p",{className:"text-red-500 text-xs italic",children:"This field is required"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Description"}),e.jsx(l,{value:t?t.description:"",onChange:a=>s("description",a),placeholder:"Enter the conference description"}),r.description&&e.jsx("p",{className:"text-red-500 text-xs italic",children:"This field is required"})]}),e.jsx("button",{type:"submit",className:"w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",children:t?"Update Conference":"Add Conference"})]}),N&&e.jsx(F,{message:"Conference submitted successfully!",onClose:()=>n(!1)}),S&&e.jsx(T,{message:"Failed to submit conference!",onClose:()=>c(!1)})]})]})};export{$ as default};
