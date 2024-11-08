import { supabase } from './config';
import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables'];

// User Queries
export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*, artist_profiles(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Tables['users']['Update']>
) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// NFT Queries
export async function getNFTsByCreator(creatorId: string) {
  const { data, error } = await supabase
    .from('nfts')
    .select('*, creator:users!creator_id(*), owner:users!owner_id(*)')
    .eq('creator_id', creatorId);

  if (error) throw error;
  return data;
}

export async function getNFTById(id: string) {
  const { data, error } = await supabase
    .from('nfts')
    .select('*, creator:users!creator_id(*), owner:users!owner_id(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Transaction Queries
export async function getTransactionsByNFT(nftId: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, nft:nfts(*), seller:users!seller_id(*), buyer:users!buyer_id(*)')
    .eq('nft_id', nftId);

  if (error) throw error;
  return data;
}

// Creator Club Queries
export async function getCreatorClubByArtist(artistId: string) {
  const { data, error } = await supabase
    .from('creator_clubs')
    .select('*')
    .eq('artist_id', artistId)
    .single();

  if (error) throw error;
  return data;
}

// Artist Profile Queries
export async function getArtistProfile(userId: string) {
  const { data, error } = await supabase
    .from('artist_profiles')
    .select('*, user:users(*)')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}