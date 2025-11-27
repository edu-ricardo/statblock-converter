(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const l=document.querySelector("#tab-converter"),u=document.querySelector("#tab-creator"),g=document.querySelector("#converter-view"),v=document.querySelector("#creator-view"),$=document.querySelector("#json-input"),b=document.querySelector("#convert-btn"),a=document.querySelector("#html-output-converter"),C=document.querySelector(".form-container"),L=document.querySelector("#generate-btn"),m=document.querySelector("#html-output-creator"),q=document.querySelector("#add-trait-btn"),A=document.querySelector("#add-action-btn"),h=document.querySelector("#traits-container"),f=document.querySelector("#actions-container");l.addEventListener("click",()=>{g.classList.remove("hidden"),v.classList.add("hidden"),l.classList.add("active"),u.classList.remove("active")});u.addEventListener("click",()=>{v.classList.remove("hidden"),g.classList.add("hidden"),u.classList.add("active"),l.classList.remove("active")});function y(e,r){const n=document.createElement("div");n.className="dynamic-item",n.innerHTML=`
        <input type="text" placeholder="Nome do ${r}" class="${r}-name">
        <input type="text" placeholder="Descrição do ${r}" class="${r}-content">
        <button type="button" class="remove-btn">X</button>
    `,e.appendChild(n),n.querySelector(".remove-btn")?.addEventListener("click",()=>n.remove())}q.addEventListener("click",()=>y(h,"trait"));A.addEventListener("click",()=>y(f,"action"));function d(e){const r=Math.floor((e-10)/2);return r>=0?`+${r}`:`${r}`}function N(e){const r=["Str","Dex","Con","Int","Wis","Cha"],n=Math.ceil(r.length/2),s=r.slice(0,n),t=r.slice(n),o=c=>`
        <div class="table-overflow-wrapper">
            <table class="physical abilities-saves">
                <thead><tr><th>&nbsp;</th><th>&nbsp;</th><th>Mod</th><th>Save</th></tr></thead>
                <tbody>
                    ${c.map(i=>`
                        <tr>
                            <th>${i.toUpperCase()}</th>
                            <td>${e[i]}</td>
                            <td>${d(e[i])}</td>
                            <td>${d(e[i])}</td>
                        </tr>`).join("")}
                </tbody>
            </table>
        </div>`;return`<div class="stats">${o(s)}${o(t)}</div>`}function p(e){return e.map(r=>`<p><strong><em>${r.Name}.</em></strong> ${r.Content}</p>`).join("")}function S(e){const n=`<strong><strong>Initiative</strong> <strong class="custom-initiative custom-stat">${d(e.Abilities.Dex)}</strong></strong>`;return`<div class="stat-block">
<div class="monster-header">${e.Name}</div>
<p>${e.Type}</p>
<p><strong>AC</strong> <strong class="custom-ac custom-stat">${e.AC.Value}</strong> ${e.AC.Notes?`(${e.AC.Notes})`:""} ${n}</p>
<p><strong>HP</strong> <strong class="custom-avghp custom-stat">${e.HP.Value}</strong> ${e.HP.Notes?`(<strong class="custom-hp-roll custom-stat">${e.HP.Notes}</strong>)`:""}</p>
<p><strong>Speed</strong> ${e.Speed.join(", ")}</p>
${N(e.Abilities)}
${e.Skills.length>0?`<p><strong>Skills</strong> ${e.Skills.map(s=>`${s.Name} +${s.Modifier}`).join(", ")}</p>`:""}
<p><strong>Senses&nbsp;</strong>${e.Senses.join(", ")}</p>
<p><strong>Languages</strong> ${e.Languages.join(", ")}</p>
<p><strong>CR</strong> ${e.Challenge}</p>
${e.Traits.length>0?p(e.Traits):""}
${e.Actions.length>0?`<p class="monster-header">Actions</p>${p(e.Actions)}`:""}
</div>`}function E(e){if(!e.Creatures||!Array.isArray(e.Creatures)||e.Creatures.length===0)return null;const r=`Creatures.${e.Creatures[0]}`;return e[r]}b.addEventListener("click",()=>{try{const e=E(JSON.parse($.value));if(!e){a.value="Erro: Formato do JSON inválido ou criatura não encontrada.";return}a.value=S(e)}catch(e){a.value=`Erro ao processar o JSON: ${e.message}`}});function O(){const e=t=>C.querySelector(`#${t}`).value,r=t=>parseInt(e(t),10)||0,n=Array.from(h.querySelectorAll(".dynamic-item")).map(t=>({Name:t.querySelector(".trait-name").value,Content:t.querySelector(".trait-content").value})),s=Array.from(f.querySelectorAll(".dynamic-item")).map(t=>({Name:t.querySelector(".action-name").value,Content:t.querySelector(".action-content").value}));return{Name:e("name"),Type:e("type"),AC:{Value:r("ac"),Notes:e("ac_notes")},HP:{Value:r("hp"),Notes:e("hp_notes")},Speed:e("speed").split(",").map(t=>t.trim()),Abilities:{Str:r("str"),Dex:r("dex"),Con:r("con"),Int:r("int"),Wis:r("wis"),Cha:r("cha")},Senses:e("senses").split(",").map(t=>t.trim()),Languages:e("languages").split(",").map(t=>t.trim()),Challenge:e("challenge"),Traits:n,Actions:s,Saves:[],Skills:[],LegendaryActions:[],DamageVulnerabilities:[],DamageResistances:[],DamageImmunities:[],ConditionImmunities:[]}}L.addEventListener("click",()=>{try{const e=O();m.value=S(e)}catch(e){m.value=`Erro ao gerar o statblock: ${e.message}`}});
