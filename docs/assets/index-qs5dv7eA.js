(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#tab-converter`),t=document.querySelector(`#tab-creator`),n=document.querySelector(`#converter-view`),r=document.querySelector(`#creator-view`),i=document.querySelector(`#json-input`),a=document.querySelector(`#convert-btn`),o=document.querySelector(`#html-output-converter`),s=document.querySelector(`.form-container`),c=document.querySelector(`#generate-btn`),l=document.querySelector(`#html-output-creator`),u=document.querySelector(`#add-trait-btn`),d=document.querySelector(`#add-action-btn`),f=document.querySelector(`#traits-container`),p=document.querySelector(`#actions-container`);e.addEventListener(`click`,()=>{n.classList.remove(`hidden`),r.classList.add(`hidden`),e.classList.add(`active`),t.classList.remove(`active`)}),t.addEventListener(`click`,()=>{r.classList.remove(`hidden`),n.classList.add(`hidden`),t.classList.add(`active`),e.classList.remove(`active`)});function m(e,t){let n=document.createElement(`div`);n.className=`dynamic-item`,n.innerHTML=`
        <input type="text" placeholder="Nome do ${t}" class="${t}-name">
        <input type="text" placeholder="Descrição do ${t}" class="${t}-content">
        <button type="button" class="remove-btn">X</button>
    `,e.appendChild(n),n.querySelector(`.remove-btn`)?.addEventListener(`click`,()=>n.remove())}u.addEventListener(`click`,()=>m(f,`trait`)),d.addEventListener(`click`,()=>m(p,`action`));function h(e){let t=Math.floor((e-10)/2);return t>=0?`+${t}`:`${t}`}function g(e){let t=[`Str`,`Dex`,`Con`,`Int`,`Wis`,`Cha`],n=Math.ceil(t.length/2),r=t.slice(0,n),i=t.slice(n),a=t=>`
        <div class="table-overflow-wrapper">
            <table class="physical abilities-saves">
                <thead><tr><th>&nbsp;</th><th>&nbsp;</th><th>Mod</th><th>Save</th></tr></thead>
                <tbody>
                    ${t.map(t=>`
                        <tr>
                            <th>${t.toUpperCase()}</th>
                            <td>${e[t]}</td>
                            <td>${h(e[t])}</td>
                            <td>${h(e[t])}</td>
                        </tr>`).join(``)}
                </tbody>
            </table>
        </div>`;return`<div class="stats">${a(r)}${a(i)}</div>`}function _(e){return e.map(e=>`<p><strong><em>${e.Name}.</em></strong> ${e.Content}</p>`).join(``)}function v(e){let t=`<strong><strong>Initiative</strong> <strong class="custom-initiative custom-stat">${h(e.Abilities.Dex)}</strong></strong>`;return`<div class="stat-block">
<div class="monster-header">${e.Name}</div>
<p>${e.Type}</p>
<p><strong>AC</strong> <strong class="custom-ac custom-stat">${e.AC.Value}</strong> ${e.AC.Notes?`(${e.AC.Notes})`:``} ${t}</p>
<p><strong>HP</strong> <strong class="custom-avghp custom-stat">${e.HP.Value}</strong> ${e.HP.Notes?`(<strong class="custom-hp-roll custom-stat">${e.HP.Notes}</strong>)`:``}</p>
<p><strong>Speed</strong> ${e.Speed.join(`, `)}</p>
${g(e.Abilities)}
${e.Skills.length>0?`<p><strong>Skills</strong> ${e.Skills.map(e=>`${e.Name} +${e.Modifier}`).join(`, `)}</p>`:``}
<p><strong>Senses&nbsp;</strong>${e.Senses.join(`, `)}</p>
<p><strong>Languages</strong> ${e.Languages.join(`, `)}</p>
<p><strong>CR</strong> ${e.Challenge}</p>
${e.Traits.length>0?_(e.Traits):``}
${e.Actions.length>0?`<p class="monster-header">Actions</p>${_(e.Actions)}`:``}
</div>`}function y(e){return!e.Creatures||!Array.isArray(e.Creatures)||e.Creatures.length===0?null:e[`Creatures.${e.Creatures[0]}`]}a.addEventListener(`click`,()=>{try{let e=y(JSON.parse(i.value));if(!e){o.value=`Erro: Formato do JSON inválido ou criatura não encontrada.`;return}o.value=v(e)}catch(e){o.value=`Erro ao processar o JSON: ${e.message}`}});function b(){let e=e=>s.querySelector(`#${e}`).value,t=t=>parseInt(e(t),10)||0,n=Array.from(f.querySelectorAll(`.dynamic-item`)).map(e=>({Name:e.querySelector(`.trait-name`).value,Content:e.querySelector(`.trait-content`).value})),r=Array.from(p.querySelectorAll(`.dynamic-item`)).map(e=>({Name:e.querySelector(`.action-name`).value,Content:e.querySelector(`.action-content`).value}));return{Name:e(`name`),Type:e(`type`),AC:{Value:t(`ac`),Notes:e(`ac_notes`)},HP:{Value:t(`hp`),Notes:e(`hp_notes`)},Speed:e(`speed`).split(`,`).map(e=>e.trim()),Abilities:{Str:t(`str`),Dex:t(`dex`),Con:t(`con`),Int:t(`int`),Wis:t(`wis`),Cha:t(`cha`)},Senses:e(`senses`).split(`,`).map(e=>e.trim()),Languages:e(`languages`).split(`,`).map(e=>e.trim()),Challenge:e(`challenge`),Traits:n,Actions:r,Saves:[],Skills:[],LegendaryActions:[],DamageVulnerabilities:[],DamageResistances:[],DamageImmunities:[],ConditionImmunities:[]}}c.addEventListener(`click`,()=>{try{l.value=v(b())}catch(e){l.value=`Erro ao gerar o statblock: ${e.message}`}});