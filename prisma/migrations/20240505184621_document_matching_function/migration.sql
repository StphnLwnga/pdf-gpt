-- Create a function for document matching
create function match_documents (
  query_embedding vector(1536),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id UUID,
  content text,
  metadata jsonb,
  embedding vector,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    embedding,
    1 - (Document_Embeddings.embedding <=> query_embedding) as similarity
  from Document_Embeddings
  where metadata @> filter
  order by Document_Embeddings.embedding <=> query_embedding
  limit match_count;
end;
$$;
