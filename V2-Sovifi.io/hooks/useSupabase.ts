'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/config';
import { toast } from 'sonner';
import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables'];

export function useSupabase<T extends keyof Tables>(
  table: T,
  options?: {
    select?: string;
    filter?: Record<string, any>;
    limit?: number;
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase.from(table).select(options?.select || '*');

        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: result, error } = await query;

        if (error) throw error;
        setData(result);
      } catch (err) {
        console.error('Supabase query failed:', err);
        setError(err as Error);
        toast.error('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [table, JSON.stringify(options)]);

  const insert = async (data: Tables[T]['Insert']) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      console.error('Insert failed:', err);
      throw err;
    }
  };

  const update = async (id: string, data: Tables[T]['Update']) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      console.error('Update failed:', err);
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Delete failed:', err);
      throw err;
    }
  };

  return {
    data,
    error,
    isLoading,
    insert,
    update,
    remove,
  };
}