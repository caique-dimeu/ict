'use client'

import React, { useState, useEffect } from 'react';

const AtividadePage = () => {
  const [groupByData, setGroupByData] = useState<any[]>([]);
  const [innerJoinData, setInnerJoinData] = useState<any[]>([]);
  const [subQueryData, setSubQueryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const groupByResponse = await fetch('/api/atividade/groupby');
      const groupByData = await groupByResponse.json();
      setGroupByData(groupByData);

      const innerJoinResponse = await fetch('/api/atividade/innerjoin');
      const innerJoinData = await innerJoinResponse.json();
      setInnerJoinData(innerJoinData);

      const subQueryResponse = await fetch('/api/atividade/subquery');
      const subQueryData = await subQueryResponse.json();
      setSubQueryData(subQueryData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Atividades de Relatório</h1>
      
      <section>
        <h2>Relatório 1: Contagem de Projetos por Status</h2>
        <pre>{JSON.stringify(groupByData, null, 2)}</pre>
      </section>

      <section>
        <h2>Relatório 2: Projetos com Orientador</h2>
        <pre>{JSON.stringify(innerJoinData, null, 2)}</pre>
      </section>

      <section>
        <h2>Relatório 3: Projetos Finalizados Recentemente</h2>
        <pre>{JSON.stringify(subQueryData, null, 2)}</pre>
      </section>
    </div>
  );
};

export default AtividadePage;
