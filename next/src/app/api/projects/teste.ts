import { NextResponse } from 'next/server';

// Simulando um banco de dados com um array de itens
let data = [
  { id: 1, name: 'Item 1', description: 'Descrição do Item 1' },
  { id: 2, name: 'Item 2', description: 'Descrição do Item 2' },
];

// Método GET: Retorna todos os itens
export async function GET() {
  return NextResponse.json(data);
}

// Método POST: Adiciona um novo item
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    const newItem = { id: data.length + 1, name, description }; // Cria novo item com id incremental
    data.push(newItem);  // Adiciona o item ao array
    return NextResponse.json(newItem);  // Retorna o novo item
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar item' }, { status: 500 });
  }
}

// Método PUT: Atualiza um item existente
export async function PUT(request: Request) {
  try {
    const { id, name, description } = await request.json();
    const itemIndex = data.findIndex((item) => item.id === id);
    
    if (itemIndex !== -1) {
      data[itemIndex] = { id, name, description };  // Atualiza o item
      return NextResponse.json(data[itemIndex]);  // Retorna o item atualizado
    }

    return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar item' }, { status: 500 });
  }
}

// Método DELETE: Deleta um item
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const itemIndex = data.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const deletedItem = data.splice(itemIndex, 1);  // Remove o item
      return NextResponse.json({ message: 'Item deletado', data: deletedItem });
    }

    return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar item' }, { status: 500 });
  }
}
