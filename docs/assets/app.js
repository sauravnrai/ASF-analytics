(() => {
'use strict';const S=window.ASF,$=id=>document.getElementById(id);let data,filtered=[],summaries=[],timer;
function render(){
 const q=$('query').value.trim().toLocaleLowerCase();filtered=q?data.rows.filter(r=>data.columns.some(c=>String(r[c]??'').toLocaleLowerCase().includes(q))):data.rows;
 summaries=data.columns.map(c=>S.stats(filtered,c));const cells=filtered.length*data.columns.length,missing=summaries.reduce((n,c)=>n+c.missingCount,0);
 $('row-count').textContent=S.format(filtered.length);$('completeness').textContent=cells?S.format(100*(cells-missing)/cells)+'%':'—';$('numeric-count').textContent=S.format(summaries.filter(c=>c.numericCount>0).length);$('filter-status').textContent=`${filtered.length} of ${data.rows.length} records match${q?' your filter':''}. Statistics and exports include all matched rows.`;
 const body=$('summary');body.replaceChildren();
 for(const s of summaries){const tr=document.createElement('tr'),type=s.numericCount?(s.textCount?'mixed':'numeric'):(s.textCount?'text / bool':'empty');const values=[s.column,type,s.numericCount,s.textCount,s.missingCount,...['mean','median','min','max','stdDev'].map(k=>S.format(s[k]))];values.forEach((v,i)=>{const cell=document.createElement(i===0?'th':'td');if(i===0)cell.scope='row';cell.textContent=String(v);tr.append(cell);});body.append(tr);}
 S.table($('preview'),{columns:data.columns,rows:filtered},20);$('export-csv').disabled=!filtered.length;$('visualize').setAttribute('aria-disabled',String(!filtered.length));
}
S.start(d=>{data=d;$('query').value='';render();});
$('query').addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(render,120);});$('reset').addEventListener('click',()=>{clearTimeout(timer);$('query').value='';render();});
$('export-csv').addEventListener('click',()=>{render();S.download('asf-filtered.csv',S.toCSV({columns:data.columns,rows:filtered}),'text/csv;charset=utf-8');});
$('export-summary').addEventListener('click',()=>{render();S.download('asf-summary.json',JSON.stringify({schemaVersion:1,dataset:data.name,filter:$('query').value.trim(),totalRows:data.rows.length,matchedRows:filtered.length,standardDeviation:'population',columns:summaries},null,2),'application/json;charset=utf-8');});
$('visualize').addEventListener('click',e=>{render();if(!filtered.length){e.preventDefault();S.status('No matching records to visualize. Reset or change the filter.',true);return;}const d={name:data.name+($('query').value.trim()?' (filtered)':''),columns:data.columns,rows:filtered};if(!S.save(d)){e.preventDefault();S.status('Session storage is unavailable. Export filtered CSV and import it in Visualizer.',true);}});
})();
