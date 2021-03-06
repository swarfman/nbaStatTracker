

const teamAbbreviations = (string) => {
    let searchTerm = string.replace(' ', '');

    let abbreviations = {
        AtlantaHawks: "ATL",
        BrooklynNets: "BKN",
        BostonCeltics: "BOS",
        CharlotteHornets: "CHA",
        ChicagoBulls: "CHI",
        ClevelandCavaliers: "CLE",
        DallasMavericks: "DAL",
        DenverNuggets: "DEN",
        DetroitPistons: "DET",
        GoldenStateWarriors: "GSW",
        HoustonRockets: "HOU",
        IndianaPacers: "IND",
        LosAngelesClippers: "LAC",
        LosAngelesLakers: "LAL",
        MemphisGrizzlies: "MEM",
        MiamiHeat: "MIA",
        MilwaukeeBucks: "MIL",
        MinnesotaTimberwolves: "MIN",
        NewOrleansPelicans: "NOP",
        NewYorkKnicks: "NYK",
        OklahomaCityThunder: "OKC",
        OrlandoMagic: "ORL",
        Philadelphia76ers: "PHI",
        PhoenixSuns: "PHX",
        PortlandTrailBlazers: "POR",
        SacramentoKings: "SAC",
        SanAntonioSpurs: "SAS",
        TorontoRaptors: "TOR",
        UtahJazz: "UTA",
        WashingtonWizards: "WAS",
    }

    return abbreviations[searchTerm];
};

export default {
    teamAbbreviations: teamAbbreviations
}