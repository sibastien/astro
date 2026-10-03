/**
 * Make Admin CLI Script
 * Usage: node scripts/makeAdmin.js <email>
 * Example: node scripts/makeAdmin.js admin@astrofrance.fr
 */

require('dotenv').config();
const prisma = require('../src/config/prisma');

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error('❌ Veuillez fournir un email : node scripts/makeAdmin.js <email>');
    process.exit(1);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`❌ Aucun utilisateur trouvé avec l'email: ${email}`);
    console.log('💡 Astuce: Inscrivez-vous d\'abord sur le site ou via l\'API, puis relancez cette commande.');
    process.exit(1);
  }

  const updated = await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
  });

  console.log(`✨ Succès ! L'utilisateur ${updated.email} est désormais ADMIN.`);
  console.log('Vous pouvez maintenant vous connecter et accéder au tableau de bord /admin.');
}

main()
  .catch((err) => {
    console.error('❌ Erreur:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
