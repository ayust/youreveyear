$(function() {
    var color1 = "#00D348",
        color2 = "#FF8300",
        color3 = "#0693C2",
        color4 = "#FF2800",
        color1t = "rgba(0,228,72,0.2)",
        colorTerrible = "rgb(148, 6, 6)",
        colorBad = "rgb(196, 72, 6)",
        colorNeutral = "rgb(148, 148, 148)",
        colorGood = "rgb(45, 103, 198)",
        colorExcellent = "rgb(26, 55, 141)";

    var charts = [];
    var statsData = {};

    var renderPage = function(year) {
        var cdata = statsData.aggregateYears[year];
        $("#wait-container").hide();
        $("#data-container").show();

        $("[data-field]").each(function() {
            var attr = $(this).attr("data-field");
            var val = cdata[attr];
            if(val !== undefined) {
                // always use positive numbers, and add commas
                val = Math.abs(cdata[attr]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                $(this).text(val);
            }
        });

        // Clear out old charts
        charts.forEach(function(chart) {
            chart.destroy();
        });
        charts = [];
        
        Chart.defaults.global.animation = false;
        Chart.defaults.global.scaleFontColor = "#aaa";
        Chart.defaults.global.tooltipFillColor = "#222";

        var makeChart = function(id, opts) {
            var ctx = $(id).get(0).getContext("2d");
            return new Chart(ctx);
        };
        
        var doughnutOpts = {
            segmentShowStroke: true,
            segmentStrokeColor: "#000",
            segmentStrokeWidth: 1,
            percentageInnerCutout: 55
        };

        charts.push(makeChart("#jumps-chart").Doughnut([
            {value: cdata["travelJumpsStargateHighSec"], color: color1, label: "High Sec"},
            {value: cdata["travelJumpsStargateLowSec"], color: color2, label: "Low Sec"},
            {value: cdata["travelJumpsStargateNullSec"], color: color4, label: "Null Sec"},
            {value: cdata["travelJumpsWormhole"], color: color3, label: "Wormhole"},
        ], doughnutOpts));
        
        charts.push(makeChart("#docks-chart").Doughnut([
            {value: cdata["travelDocksHighSec"], color: color1, label: "High Sec"},
            {value: cdata["travelDocksLowSec"], color: color2, label: "Low Sec"},
            {value: cdata["travelDocksNullSec"], color: color4, label: "Null Sec"},
            /*{value: cdata["travelDocksWormhole"], color: color3, label: "Wormhole"},*/
        ], doughnutOpts));
        
        charts.push(makeChart("#warps-chart").Doughnut([
            {value: cdata["travelJumpsStargateHighSec"], color: color1, label: "High Sec"},
            {value: cdata["travelJumpsStargateLowSec"], color: color2, label: "Low Sec"},
            {value: cdata["travelJumpsStargateNullSec"], color: color4, label: "Null Sec"},
            {value: cdata["travelJumpsWormhole"], color: color3, label: "Wormhole"},
        ], doughnutOpts));
        
        charts.push(makeChart("#warp-distance-chart").Doughnut([
            {value: cdata["travelWarpsHighSec"], color: color1, label: "High Sec"},
            {value: cdata["travelWarpsLowSec"], color: color2, label: "Low Sec"},
            {value: cdata["travelWarpsNullSec"], color: color4, label: "Null Sec"},
            {value: cdata["travelWarpsWormhole"], color: color3, label: "Wormhole"},
        ], doughnutOpts));
        
        charts.push(makeChart("#local-tank-chart").Doughnut([
            {value: cdata["combatRepairShieldSelfAmount"], color: color3, label: "Shield"},
            {value: cdata["combatRepairArmorSelfAmount"], color: color1, label: "Armor"},
            {value: cdata["combatRepairHullSelfAmount"], color: color4, label: "Hull"},
        ], doughnutOpts));
        
        charts.push(makeChart("#incoming-tank-chart").Doughnut([
            {value: cdata["combatRepairShieldByRemoteAmount"], color: color3, label: "Shield"},
            {value: cdata["combatRepairArmorByRemoteAmount"], color: color1, label: "Armor"},
            {value: cdata["combatRepairHullByRemoteAmount"], color: color4, label: "Hull"},
        ], doughnutOpts));
        
        charts.push(makeChart("#outgoing-tank-chart").Doughnut([
            {value: cdata["combatRepairShieldRemoteAmount"], color: color3, label: "Shield"},
            {value: cdata["combatRepairArmorRemoteAmount"], color: color1, label: "Armor"},
            {value: cdata["combatRepairHullRemoteAmount"], color: color4, label: "Hull"},
        ], doughnutOpts));
        
        charts.push(makeChart("#outgoing-contact-chart").Doughnut([
            {value: cdata["socialAddContactHorrible"], color: colorTerrible, label: "Terrible"},
            {value: cdata["socialAddContactBad"], color: colorBad, label: "Bad"},
            {value: cdata["socialAddContactNeutral"], color: colorNeutral, label: "Neutral"},
            {value: cdata["socialAddContactGood"], color: colorGood, label: "Good"},
            {value: cdata["socialAddContactHigh"], color: colorExcellent, label: "Excellent"},
        ], doughnutOpts));
        
        charts.push(makeChart("#incoming-contact-chart").Doughnut([
            {value: cdata["socialAddedAsContactHorrible"], color: colorTerrible, label: "Terrible"},
            {value: cdata["socialAddedAsContactBad"], color: colorBad, label: "Bad"},
            {value: cdata["socialAddedAsContactNeutral"], color: colorNeutral, label: "Neutral"},
            {value: cdata["socialAddedAsContactGood"], color: colorGood, label: "Good"},
            {value: cdata["socialAddedAsContactHigh"], color: colorExcellent, label: "Excellent"},
        ], doughnutOpts));
        
        /*
        makeChart("#kills-chart").Doughnut([
            {value: 24, color: color1, label: "High Sec"},
            {value: 41, color: color2, label: "Low Sec"},
            {value: 23, color: color4, label: "Null Sec"},
            {value: 72, color: color3, label: "Wormhole"},
        ], doughnutOpts);
        
        makeChart("#deaths-chart").Doughnut([
            {value: 24, color: color1, label: "High Sec"},
            {value: 41, color: color2, label: "Low Sec"},
            {value: 23, color: color4, label: "Null Sec"},
            {value: 72, color: color3, label: "Wormhole"},
        ], doughnutOpts);
        */
        
        var radarOpts = {
            scaleShowLine: true,
            scaleLineColor: "rgba(255,255,255,0.2)",
            angleShowLineOut: true,
            angleLineColor: "rgba(220,220,220,0.1)",
            responsive: false,
            pointDot: false,
            pointLabelFontColor: "rgba(220,220,220,0.7)",
            pointLabelFontSize: 12,
        };
        
        charts.push(makeChart("#kills-deaths-chart").Radar({
            labels: ["HIGH SEC", "LOW SEC", "NULL SEC", "WORMHOLE"],
            datasets: [
                {
                    fillColor: "rgba(80, 80, 220, 0.2)",
                    strokeColor: color3,
                    pointColor: color3,
                    data: [cdata["combatKillsHighSec"], cdata["combatKillsLowSec"], cdata["combatKillsNullSec"], cdata["combatKillsWormhole"]],
                },
                {
                    fillColor: "rgba(220, 80, 80, 0.2)",
                    strokeColor: color4,
                    pointColor: color4,
                    data: [cdata["combatDeathsHighSec"], cdata["combatDeathsLowSec"], cdata["combatDeathsNullSec"], cdata["combatDeathsWormhole"]],
                },
            ]
        }, radarOpts));
        
        var barOpts = {
            scaleGridLineColor: "rgba(255,255,255,0.1)",
            scaleShowVerticalLines: false,
            responsive: true,
        };

        charts.push(makeChart("#damage-dealt-chart").HorizontalBar({
            labels: ["BOMBS", "SMARTBOMBS", "FI. BOMBERS", "DOOMSDAYS", "DRONES", "LASERS", "HYBRIDS", "MISSILES", "PROJECTILES"],
            datasets: [
                {
                    fillColor: color1,
                    data: [
                      cdata["combatDamageToPlayersBombAmount"],
                      cdata["combatDamageToPlayersSmartBombAmount"],
                      cdata["combatDamageToPlayersFighterBomberAmount"],
                      cdata["combatDamageToPlayersSuperAmount"],
                      cdata["combatDamageToPlayersCombatDroneAmount"],
                      cdata["combatDamageToPlayersEnergyAmount"],
                      cdata["combatDamageToPlayersHybridAmount"],
                      cdata["combatDamageToPlayersMissileAmount"],
                      cdata["combatDamageToPlayersProjectileAmount"],
                    ]
                },
            ]
        }, barOpts));
        
        charts.push(makeChart("#damage-received-chart").HorizontalBar({
            labels: ["BOMBS", "SMARTBOMBS", "FI. BOMBERS", "DOOMSDAYS", "DRONES", "LASERS", "HYBRIDS", "MISSILES", "PROJECTILES"],
            datasets: [
                {
                    fillColor: color1,
                    data: [
                      cdata["combatDamageFromPlayersBombAmount"],
                      cdata["combatDamageFromPlayersSmartBombAmount"],
                      cdata["combatDamageFromPlayersFighterBomberAmount"],
                      cdata["combatDamageFromPlayersSuperAmount"],
                      cdata["combatDamageFromPlayersCombatDroneAmount"],
                      cdata["combatDamageFromPlayersEnergyAmount"],
                      cdata["combatDamageFromPlayersHybridAmount"],
                      cdata["combatDamageFromPlayersMissileAmount"],
                      cdata["combatDamageFromPlayersProjectileAmount"],
                    ]
                },
            ]
        }, barOpts));
        
        charts.push(makeChart("#mining-chart").Bar({
            labels: ["ARKONOR", "BISTOT", "CROKITE", "DARK OCHRE", "GAS", "GNEISS", "HEDBERGITE", "HEMORPHITE", "ICE", "JASPET", "KERNITE", "MERCOXIT", "OMBER", "PLAGIOCLASE", "PYROXERES", "SCORDITE", "SPODUMAIN", "VELDSPAR"],
            datasets: [
                {
                    strokeColor: color3,
                    fillColor: "#111",
                    data: [ cdata["miningOreArkonor"], cdata["miningOreBistot"], cdata["miningOreCrokite"], cdata["miningOreDarkOchre"], cdata["miningOreHarvestableCloud"], cdata["miningOreGneiss"], cdata["miningOreHedbergite"], cdata["miningOreHemorphite"], cdata["miningOreIce"], cdata["miningOreJaspet"], cdata["miningOreKernite"], cdata["miningOreMercoxit"], cdata["miningOreOmber"], cdata["miningOrePlagioclase"], cdata["miningOrePyroxeres"], cdata["miningOreScordite"], cdata["miningOreSpodumain"], cdata["miningOreVeldspar"] ],
                },
            ]
        }, barOpts));

    };

    var tok = /access_token=([^&;]+)/.exec(window.location.hash);
    var cache = {};

    var crestGet = function(path, cb) {
        if(cache[path]) {
            cb(cache[path])
            return;
        }
        $.ajax(path, {
              headers: { Authorization: "Bearer " + tok[1] },
              success: function(data) {
                  cache[path] = data;
                  cb(data);
              },
          });
    };

    var processDecode = function(data) {
        var c = /characters\/(\d+)/.exec(data.character.href);
        if(c) {
            crestGet(data.character.href, processCharacter);
        } else {
            console.log(data);
        }
    };

    var processCharacter = function(data) {
        $(".portrait").html('<img src="https://image.eveonline.com/Character/' + data.id + '_128.jpg" />');
        $(".character-name").text(data.name);
        crestGet("https://characterstats.tech.ccp.is/v1/" + data.id + "/", processStats);
    };

    var processStats = function(data) {
        statsData = data;
        for(var year in data.aggregateYears) {
          $(".year-list").append('<li data-year="' + year + '">' + year + '</li>');
        }

        $(".year-list li").click(function() {
            var year = $(this).attr("data-year");
            $(".year-list li").removeClass("current");
            $(this).addClass("current");
            $('.year').text($(this).text());
            renderPage(year);
        });
        $("#login-container").hide();
        $("#wait-container").hide();
        $("#year-container-container").show();
    };

    if(tok) {
        window.location.hash = "";
        crestGet("https://crest-tq.eveonline.com/decode/", processDecode);
    } else {
        $("#wait-container").hide();
        $("#login-container").show();
    }
    
});
