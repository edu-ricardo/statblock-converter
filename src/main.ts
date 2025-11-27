import './style.css';

// --- Type Definitions for Statblock ---
interface AbilityScores {
    Str: number; Dex: number; Con: number;
    Int: number; Wis: number; Cha: number;
}
interface SimpleTrait { Name: string; Content: string; }
interface Creature {
    Name: string; Type: string;
    HP: { Value: number; Notes: string };
    AC: { Value: number; Notes: string };
    Speed: string[];
    Abilities: AbilityScores;
    Saves: { Name: string; Modifier: number }[];
    Skills: { Name: string; Modifier: number }[];
    Senses: string[]; Languages: string[];
    Challenge: string; Traits: SimpleTrait[];
    Actions: SimpleTrait[]; LegendaryActions: SimpleTrait[];
    DamageVulnerabilities: string[]; DamageResistances: string[];
    DamageImmunities: string[]; ConditionImmunities: string[];
    InitiativeModifier?: number;
}

// --- DOM Elements ---
// Tabs and Views
const tabConverter = document.querySelector<HTMLButtonElement>('#tab-converter')!;
const tabCreator = document.querySelector<HTMLButtonElement>('#tab-creator')!;
const converterView = document.querySelector<HTMLDivElement>('#converter-view')!;
const creatorView = document.querySelector<HTMLDivElement>('#creator-view')!;

// Converter Elements
const jsonInput = document.querySelector<HTMLTextAreaElement>('#json-input')!;
const convertBtn = document.querySelector<HTMLButtonElement>('#convert-btn')!;
const htmlOutputConverter = document.querySelector<HTMLTextAreaElement>('#html-output-converter')!;

// Creator Elements
const form = document.querySelector<HTMLDivElement>('.form-container')!;
const generateBtn = document.querySelector<HTMLButtonElement>('#generate-btn')!;
const htmlOutputCreator = document.querySelector<HTMLTextAreaElement>('#html-output-creator')!;
const addTraitBtn = document.querySelector<HTMLButtonElement>('#add-trait-btn')!;
const addActionBtn = document.querySelector<HTMLButtonElement>('#add-action-btn')!;
const traitsContainer = document.querySelector<HTMLDivElement>('#traits-container')!;
const actionsContainer = document.querySelector<HTMLDivElement>('#actions-container')!;


// --- Tab Switching Logic ---
tabConverter.addEventListener('click', () => {
    converterView.classList.remove('hidden');
    creatorView.classList.add('hidden');
    tabConverter.classList.add('active');
    tabCreator.classList.remove('active');
});

tabCreator.addEventListener('click', () => {
    creatorView.classList.remove('hidden');
    converterView.classList.add('hidden');
    tabCreator.classList.add('active');
    tabConverter.classList.remove('active');
});

// --- Dynamic Form Logic ---
function addDynamicItem(container: HTMLElement, type: 'trait' | 'action') {
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.innerHTML = `
        <input type="text" placeholder="Nome do ${type}" class="${type}-name">
        <input type="text" placeholder="Descrição do ${type}" class="${type}-content">
        <button type="button" class="remove-btn">X</button>
    `;
    container.appendChild(div);
    div.querySelector('.remove-btn')?.addEventListener('click', () => div.remove());
}

addTraitBtn.addEventListener('click', () => addDynamicItem(traitsContainer, 'trait'));
addActionBtn.addEventListener('click', () => addDynamicItem(actionsContainer, 'action'));

// --- Core HTML Generation Logic (Refactored) ---

function calculateModifier(score: number): string {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

function renderAbilities(abilities: AbilityScores): string {
    const abilitiesOrder: (keyof AbilityScores)[] = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'];
    const half = Math.ceil(abilitiesOrder.length / 2);
    const firstHalf = abilitiesOrder.slice(0, half);
    const secondHalf = abilitiesOrder.slice(half);

    const renderTable = (keys: (keyof AbilityScores)[]) => `
        <div class="table-overflow-wrapper">
            <table class="physical abilities-saves">
                <thead><tr><th>&nbsp;</th><th>&nbsp;</th><th>Mod</th><th>Save</th></tr></thead>
                <tbody>
                    ${keys.map(key => `
                        <tr>
                            <th>${key.toUpperCase()}</th>
                            <td>${abilities[key]}</td>
                            <td>${calculateModifier(abilities[key])}</td>
                            <td>${calculateModifier(abilities[key])}</td>
                        </tr>`).join('')}
                </tbody>
            </table>
        </div>`;
    return `<div class="stats">${renderTable(firstHalf)}${renderTable(secondHalf)}</div>`;
}

function renderTraitsActions(items: SimpleTrait[]): string {
    return items.map(item => `<p><strong><em>${item.Name}.</em></strong> ${item.Content}</p>`).join('');
}

function generateStatblockHtml(data: Creature): string {
    const initiativeValue = calculateModifier(data.Abilities.Dex);
    const initiative = `<strong><strong>Initiative</strong> <strong class="custom-initiative custom-stat">${initiativeValue}</strong></strong>`;
    return `<div class="stat-block">
<div class="monster-header">${data.Name}</div>
<p>${data.Type}</p>
<p><strong>AC</strong> <strong class="custom-ac custom-stat">${data.AC.Value}</strong> ${data.AC.Notes ? `(${data.AC.Notes})` : ''} ${initiative}</p>
<p><strong>HP</strong> <strong class="custom-avghp custom-stat">${data.HP.Value}</strong> ${data.HP.Notes ? `(<strong class="custom-hp-roll custom-stat">${data.HP.Notes}</strong>)` : ''}</p>
<p><strong>Speed</strong> ${data.Speed.join(', ')}</p>
${renderAbilities(data.Abilities)}
${data.Skills.length > 0 ? `<p><strong>Skills</strong> ${data.Skills.map(s => `${s.Name} +${s.Modifier}`).join(', ')}</p>` : ''}
<p><strong>Senses&nbsp;</strong>${data.Senses.join(', ')}</p>
<p><strong>Languages</strong> ${data.Languages.join(', ')}</p>
<p><strong>CR</strong> ${data.Challenge}</p>
${data.Traits.length > 0 ? renderTraitsActions(data.Traits) : ''}
${data.Actions.length > 0 ? `<p class="monster-header">Actions</p>${renderTraitsActions(data.Actions)}` : ''}
</div>`;
}

// --- Converter Logic ---
function getCreatureDataFromJson(json: any): Creature | null {
    if (!json.Creatures || !Array.isArray(json.Creatures) || json.Creatures.length === 0) return null;
    const creatureNameKey = `Creatures.${json.Creatures[0]}`;
    return json[creatureNameKey] as Creature;
}

convertBtn.addEventListener('click', () => {
    try {
        const data = getCreatureDataFromJson(JSON.parse(jsonInput.value));
        if (!data) {
            htmlOutputConverter.value = `Erro: Formato do JSON inválido ou criatura não encontrada.`;
            return;
        }
        htmlOutputConverter.value = generateStatblockHtml(data);
    } catch (error) {
        htmlOutputConverter.value = `Erro ao processar o JSON: ${(error as Error).message}`;
    }
});

// --- Creator Logic ---
function buildCreatureFromForm(): Creature {
    const getVal = (id: string) => (form.querySelector(`#${id}`) as HTMLInputElement).value;
    const getNum = (id: string) => parseInt(getVal(id), 10) || 0;

    const traits: SimpleTrait[] = Array.from(traitsContainer.querySelectorAll('.dynamic-item')).map(div => ({
        Name: (div.querySelector('.trait-name') as HTMLInputElement).value,
        Content: (div.querySelector('.trait-content') as HTMLInputElement).value,
    }));
    const actions: SimpleTrait[] = Array.from(actionsContainer.querySelectorAll('.dynamic-item')).map(div => ({
        Name: (div.querySelector('.action-name') as HTMLInputElement).value,
        Content: (div.querySelector('.action-content') as HTMLInputElement).value,
    }));

    return {
        Name: getVal('name'),
        Type: getVal('type'),
        AC: { Value: getNum('ac'), Notes: getVal('ac_notes') },
        HP: { Value: getNum('hp'), Notes: getVal('hp_notes') },
        Speed: getVal('speed').split(',').map(s => s.trim()),
        Abilities: {
            Str: getNum('str'), Dex: getNum('dex'), Con: getNum('con'),
            Int: getNum('int'), Wis: getNum('wis'), Cha: getNum('cha'),
        },
        Senses: getVal('senses').split(',').map(s => s.trim()),
        Languages: getVal('languages').split(',').map(s => s.trim()),
        Challenge: getVal('challenge'),
        Traits: traits,
        Actions: actions,
        // --- Default/Empty values for fields not in form yet ---
        Saves: [], Skills: [], LegendaryActions: [],
        DamageVulnerabilities: [], DamageResistances: [],
        DamageImmunities: [], ConditionImmunities: [],
    };
}

generateBtn.addEventListener('click', () => {
    try {
        const creatureData = buildCreatureFromForm();
        htmlOutputCreator.value = generateStatblockHtml(creatureData);
    } catch (error) {
        htmlOutputCreator.value = `Erro ao gerar o statblock: ${(error as Error).message}`;
    }
});