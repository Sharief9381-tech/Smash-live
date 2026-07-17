# SmashLive Database Queries Reference

This document catalogs the Supabase (PostgreSQL) queries used across the application for synchronization.

## 1. Athlete Profiles (`profiles` table)

### Check if Athlete Exists (Login)
```javascript
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('email', email)
  .single();
```

### Initialize New Athlete (Registration)
```javascript
const { data: newProfile } = await supabase
  .from('profiles')
  .insert([{ email, name, onboarding_complete: false }])
  .select()
  .single();
```

### Update Athlete Dossier (Onboarding/Edit)
```javascript
const { data } = await supabase
  .from('profiles')
  .update({ name: 'Viktor', gender: 'male', state: 'Karnataka' })
  .eq('id', id);
```

## 2. Tournament Circuits (`tournaments` table)

### Fetch Active Circuits
```javascript
const { data } = await supabase
  .from('tournaments')
  .select('*')
  .neq('status', 'Completed')
  .order('created_at', { ascending: false });
```

### Create New Circuit
```javascript
const { data } = await supabase
  .from('tournaments')
  .insert([{
    name: 'Mumbai Open',
    slug: 'mumbai-open-xyz',
    city: 'Mumbai',
    format: 'elimination',
    status: 'Accepting'
  }]);
```

### Delete Circuit
```javascript
await supabase
  .from('tournaments')
  .delete()
  .eq('id', id);
```

## 3. Athlete Entries (`participants` table)

### Register for Tournament
```javascript
await supabase
  .from('participants')
  .insert([{
    tournament_id: '...',
    name: 'Athlete Name',
    smash_id: 'Smash#001'
  }]);
```

### Fetch Registered Athletes for Tournament
```javascript
const { data } = await supabase
  .from('participants')
  .select('*')
  .eq('tournament_id', tournamentId);
```

## 4. Live Match Intelligence (`matches` table)

### Fetch Live Feeds
```javascript
const { data } = await supabase
  .from('matches')
  .select('*')
  .eq('status', 'live');
```

### Synchronize Point Update
```javascript
await supabase
  .from('matches')
  .update({
    current_score: [21, 19],
    sets_won: [1, 0],
    serving: 1,
    last_update: new Date().toISOString()
  })
  .eq('id', matchId);
```

### Finalize Match
```javascript
await supabase
  .from('matches')
  .update({ status: 'completed' })
  .eq('id', matchId);
```

## 5. System Analytics (Aggregates)

### Real-time Counts
```javascript
const { count } = await supabase
  .from('profiles')
  .select('*', { count: 'exact', head: true });