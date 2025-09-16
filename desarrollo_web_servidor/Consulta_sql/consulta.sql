SELECT p.nombre
FROM PROFESORES p
JOIN IMPARTE i ON p.cod_prof = i.cod_prof
JOIN CENTROS c ON i.id_centro = c.id_centro
WHERE p.especialidad = 'Informática'
  AND i.turno = 'Tarde'
  AND c.tipo = 'Público';
