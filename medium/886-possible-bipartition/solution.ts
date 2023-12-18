function possibleBipartition(n: number, dislikes: number[][]): boolean {
    // Need to handle edge case:
    if (n == 1) {
        return true;
    }

    // Need to initialise array of nodesToTraverse
    let nodesToTraverse: number[][] = [];
    dislikes.forEach((nodes: number[]) => {
        if (!nodesToTraverse[nodes[0]]) {
            nodesToTraverse[nodes[0]] = [];
        }
        nodesToTraverse[nodes[0]].push(nodes[1]);
        
        if (!nodesToTraverse[nodes[1]]) {
            nodesToTraverse[nodes[1]] = [];
        }
        nodesToTraverse[nodes[1]].push(nodes[0]);
    });

    // Need to initialise colouredNodes
    let colouredNodes = new Array();
    for (let i: number = 0; i < n; i++) {
        colouredNodes[i] = 0;
    }

    // 0 index shift
    nodesToTraverse.shift();

    // TRAVERSE!
    // Need to do this in a for loop here due to non-contiguous graphs
    // Could it be optimised? Maybe, but IT WORKS
    for (let i = 1; i <= n; i++) {
        if (colouredNodes[i-1] == 0) {
            if (!dfs(colouredNodes, nodesToTraverse, i, 1)) {
                return false;
            }
        }
    }
    return true;

    function dfs(
        colouredNodes: number[],
        nodesToTraverse: number[][],
        currNode: number,
        colour: number
    ): boolean {
        currNode--;
        if (colouredNodes[currNode] != 0 && colouredNodes[currNode] != colour) {
            return false;
        } else if (colouredNodes[currNode] == colour) {
            return true;
        }

        colouredNodes[currNode] = colour;

        while (nodesToTraverse[currNode] && nodesToTraverse[currNode].length > 0) {
            let nextNode: number = nodesToTraverse[currNode][0];
            nodesToTraverse[currNode].shift();

            if (!dfs(
                colouredNodes,
                nodesToTraverse,
                nextNode,
                colour * -1
            )) {
                return false;
            }
        }
        return true;
    }
};
