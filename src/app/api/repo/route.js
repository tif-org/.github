export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || ''; // Mendapatkan path dari query parameter

  const repoOwner = 'figuran04'; // Ganti dengan pemilik repo Anda
  const repoName = 'tif'; // Ganti dengan nama repo Anda

  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: response.ok ? 200 : 404,
    headers: { 'Content-Type': 'application/json' }
  });
}
