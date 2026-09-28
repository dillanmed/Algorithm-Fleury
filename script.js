//representa o grafo usando lista de adjacência
const grafo = {
    0: [1, 3],
    1: [0, 2, 4, 5],
    2: [3, 1, 4, 5],
    3: [0, 2],
    4: [1, 2],
    5: [1, 2]
};


//função para remover a aresta u-v no grafo
function removerAresta(grafo, u, v) {
    grafo[u] = grafo[u].filter(x => x !== v);
    grafo[v] = grafo[v].filter(x => x !== u);
}


//função para adicionar novamente a aresta u-v no grafo
function adicionarAresta(grafo, u, v) {
    grafo[u].push(v);
    grafo[v].push(u);
}


//DFS usada para contar quantos vértices ainda são alcançáveis a partir de um vértice
function contarAlcancaveis(grafo, inicio) {
    const visitado = new Set();

    function dfs(v) {
        visitado.add(v);

        for (const vizinho of grafo[v]) {
            if (!visitado.has(vizinho)) {
                dfs(vizinho);
            }
        }
    }

    dfs(inicio);

    return visitado.size;
}


//função para verificar se a aresta u-v é uma ponte
function ehPonte(grafo, u, v) {
    //conta vértices alcançáveis antes da remoção
    const antes = contarAlcancaveis(grafo, u);

    //chamada de função
    removerAresta(grafo, u, v);

    //conta vértices que continuam alcançáveis após a remoção
    const depois = contarAlcancaveis(grafo, u);

    //chamada de função
    adicionarAresta(grafo, u, v);

    //se ficou menos acessível depois da remoção do que antes da remoção, a aresta removida era uma ponte
    return depois < antes;
}


// Algoritmo de Fleury
function fleury(grafo, inicio) {
    let atual = inicio;
    const tour = [atual];

    //continua em execução enquanto existirem arestas
    while (grafo[atual].length > 0) {

        const vizinhos = [...grafo[atual]];
        let proximo = null;

        //procura uma aresta que não seja ponte
        for (const vizinho of vizinhos) {
            if (!ehPonte(grafo, atual, vizinho)) {
                proximo = vizinho;
                break;
            }
        }

        //se todas forem pontes, escolhe qualquer uma
        if (proximo === null) {
            proximo = vizinhos[0];
        }

        //remove a aresta escolhida
        removerAresta(grafo, atual, proximo);

        //vai para o próximo vértice
        atual = proximo;

        //adiciona o vértice ao Tour
        tour.push(atual);
    }

    return tour;
}


//executa o algoritmo começando pelo vértice 0
const tour = fleury(grafo, 0);
console.log("Tour de Euler:");
console.log(tour.join(" -> "));