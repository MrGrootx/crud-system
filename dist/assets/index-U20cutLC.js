(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function u(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=u(e);fetch(e.href,n)}})();document.addEventListener("DOMContentLoaded",function(){const g=document.querySelector("#closeModel"),l=document.querySelector("#dataList"),u=document.querySelector("#mainForm"),s=document.querySelector("#modal"),e=document.getElementById("Name"),n=document.getElementById("Age"),i=document.getElementById("genderSelect"),f=document.getElementById("editForm"),p=document.getElementById("editName"),y=document.getElementById("editAge"),b=document.getElementById("editGenderSelect"),S=document.getElementById("editIndex");u.addEventListener("submit",function(o){o.preventDefault();const t=e.value.trim(),a=+n.value.trim(),r=i.value;t!=""&&r!==""?(E({name:t,age:a,gender:r}),m(),u.reset()):alert("Please full all Details")}),f.addEventListener("submit",function(o){o.preventDefault();const t=S.value.trim(),a=p.value.trim(),r=parseInt(y.value.trim()),c=b.value;if(a!=""&&c!==""){const d=JSON.parse(localStorage.getItem("Data"))||[];console.log(d),d[t].name=a,d[t].age=r,d[t].gender=c,localStorage.setItem("Data",JSON.stringify(d)),f.reset(),s.classList.add("hidden"),m()}else alert("Please full all Details")});function E(o){const t=JSON.parse(localStorage.getItem("Data"))||[];t.push(o),localStorage.setItem("Data",JSON.stringify(t))}m(),g.addEventListener("click",function(){s.classList.add("hidden")});function v(){const o=this.dataset.index,t=JSON.parse(localStorage.getItem("Data"))||[],a=t[o];console.log(t[o]),S.value=o,p.value=a.name,y.value=a.age,b.value=a.gender,s.classList.remove("hidden")}function I(){if(confirm("Are You Sure to Delete ?")){const o=this.dataset.index,t=JSON.parse(localStorage.getItem("Data"))||[];t.splice(o,1),localStorage.setItem("Data",JSON.stringify(t)),m()}}function m(){const o=JSON.parse(localStorage.getItem("Data"))||[];l.innerHTML="",o.forEach(function(r,c){const d=document.createElement("tr");d.innerHTML=`
      <tr class="hover:bg-gray-100 duration-1000 cursor-pointer">
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
                ${r.name}
              </td>
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
              ${r.age}
              </td>
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
              ${r.gender}
              </td>
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
                <button
                  data-index="${c}"
                  type="button"
                  id="btnEdit"
                  class="bg-teal-500 py-2 px-6 rounded hover:bg-teal-600 hover:text-white transition-all duration-300"
                >
                  Edit
                </button>
              </td>
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
                <button
                  type="button"
                  data-index="${c}"
                  id="btnDelete"
                  class="bg-red-500 py-2 px-6 rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
      `,l.appendChild(d)}),document.querySelectorAll("#btnEdit").forEach(r=>{r.addEventListener("click",v)}),document.querySelectorAll("#btnDelete").forEach(r=>{r.addEventListener("click",I)})}});
