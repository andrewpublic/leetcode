# Summary

Here we will explain how to identify what type of problem this is, and how to use DSA concepts like Graph Theory to solve the problem.

In my first attempt, I tried to use hashmaps to keep track of nodes.
This approach quickly breaks down.

After researching, this clearly became a graph colouring problem.

> How do we identify this?

---

1. We are given an array of arrays of 2 numbers each.
> [[1, 2], [2, 3], [3, 4]]
- This is a common way to describe graphs
- Each sub-array is an Edge connecting two Nodes (or vertices) together

---

2. This particular problem asks to separate two sets of 'people' or nodes into two groups.
> This is a classic indicator of a Bipartite Graph problem.
- We can now use known information from DSA Graph Theory to solve this problem.

# Graph Theory - Bipartite Graph

![Screen Shot 2023-12-16 at 4.26.56 pm.png](https://assets.leetcode.com/users/images/382d10f6-3ae9-4b0b-8fb0-4ab00fb6aa27_1702809313.320962.png)


>In Graph Theory, a graph can be twisted and manipulated in many ways.
Properties such as bipartiteness guarantees that the property holds true for a graph no matter which shape or form it takes.

The above graph is mathematically equivalent to the below graph.

# How to solve for a Bipartite Graph

![Screen Shot 2023-12-17 at 9.36.07 pm.png](https://assets.leetcode.com/users/images/1ca4ca0b-5070-4199-bcdb-bd6bd0bcc364_1702809440.7959228.png)

> A graph is bipartite if each node can be coloured opposite to its adjacent nodes.
> This property is mathematically equivalent to the original question's problem statement.


![Screen Shot 2023-12-17 at 9.36.22 pm.png](https://assets.leetcode.com/users/images/f2741860-5a3f-4527-860e-974b75214972_1702809448.7405026.png)

Source for pictures: [Medium Article (not me)](https://rohithv63.medium.com/graph-algorithm-bipartite-graph-dfs-f7f6a4afed4c)

# Approach

> First, we need to initialise an array of nodes that we will traverse.

Originally I was using a map with the node as the key and an array of its adjacent nodes as the value, but this can be achieved with an array instead of a map, where the index of the array is equivalent to the key of the map (since all our keys/nodes are integers).

> Second, we need to initialise an array of coloured nodes.

We set these to 0 so we know which haven't been coloured/traversed yet. Otherwise, the two colours will be represented by -1 and 1.

If we ever traverse through a node that is coloured and has a colour that doesn't match what we're passing in, then we return false.

> Warning!

We can't just traverse through once using DFS and expect it to be ok. There is a test case using non-contiguous graph. This tripped me up because I was traversing through and it would return true for that test case.

Thus, I have hastily coded in an outer loop to cover these cases.

> Note!

I've index shifted to 0 since the nodes start at 1, but our array is 0 indexed, and we use our array indexes as the 'keys' for our nodes and its adjacent nodes.

# Complexity
- Time complexity:
O(N + E) - Please fact check

- Space complexity:
O(N + E) - Please fact check

# Code
```
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
```
