import sys
import re
import json

POKEMON_TYPE = "dark"
REDvYELLOW = "yellow"


blueEffectNames = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"]

#First ~6 grids are always the same order most of the time
gridCoords = [[1,-1],[1,0],[0,1],[-1,1],[-1,0],[0,-1], [1,-2]]

def separateEnergyCost(line):
    separatedElements = [element.strip() for element in re.split('\||,', line)]

    prunedElements = []
    for element in separatedElements:
        #Remove non numbers from the text in the grid
        removeText = re.sub("[A-z\s():]*", '', element)
        prunedElements.append(removeText)

    return prunedElements

def separateEffectValue(line):
    #Format of "text number"
    value = [int(s) for s in line.split() if s.isdigit()]
    
    text = re.sub("\d", repl='', string=line)
    return (text, value[0] if value else None)

#Gets the sync level requirement if applicable
def getSyncLevel(line):
    pattern = "Sync move must be Lv. [1-9] or higher"
    match = re.search(pattern, line)

    if match:
        removeText = re.sub("[A-z. ]*", '', line)
        return int(removeText)

if __name__ == "__main__" :
    
    fileName = sys.argv[1]

    allGrids = []

    #Read the text file of sync grid info
    with open(fileName, "r") as inputFile:
            #reader = csv.reader(csvfile)
        singleGrid = ""

        for row in inputFile:
            if row == '\n':
                info = [singleInfo.strip() for singleInfo in singleGrid.rstrip().split('\n')]
                allGrids.append(info)
                singleGrid = ""

            else: 
                singleGrid += row

    #Get last row
    info = [singleInfo.strip() for singleInfo in singleGrid.rstrip().split('\n')]
    allGrids.append(info)

    results = []

    for grid in allGrids:
        formattedNumbers = separateEnergyCost(grid[0])
        formattedEffect = separateEffectValue(grid[1])
        syncLevel = 1

        if len(grid) > 3:
            for i in range(3, len(grid)):
                readSyncLevel = getSyncLevel(grid[i])
                if readSyncLevel:
                    syncLevel = readSyncLevel
                    break

        #Try to be smart about colour and iconType to minimize manual changes later
        if formattedEffect[0].strip() in blueEffectNames:
            colour = "blue"
            iconType = "stat"
        elif "Power â†‘" in grid[2]:
            colour = "green"
            iconType = POKEMON_TYPE
        #Probably either yellow unique or red unique (Change according to ind. grids probably)
        else:
            print(grid[2])
            colour = REDvYELLOW
            iconType = "unique"

        if int(formattedNumbers[0]) <= len(gridCoords):
            coords = gridCoords[int(formattedNumbers[0])-1]
        else:
            coords = [0,0]

        formattedText = {
            "coords" : coords,
            "colour" : colour,
            "iconType" : iconType,
            "energyCost" : int(formattedNumbers[1]),
            "orbCost" : int(formattedNumbers[2]),
            "effectName" : formattedEffect[0].strip(),
            "effectValue" : formattedEffect[1] if formattedEffect[1] else 0,
            "effectDescription" : grid[2],
            "syncLevel" : syncLevel,

        }

        results.append({"grid"+formattedNumbers[0] : formattedText})

    with open(fileName + '.json', 'w') as file:
        json.dump(results,file, ensure_ascii=False, indent=4)




                #writer.writerow(separatedAddress)
